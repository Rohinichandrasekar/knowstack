from flask_restx import Namespace, Resource, fields
from flask import request
from models import db, Query
from datetime import datetime
from utils import token_required

query_ns = Namespace("query", description="Query operations")

query_model = query_ns.model("Query", {
    "question": fields.String(required=True)
})
answer_model = query_ns.model("Query", {
    "answer": fields.String(required=True)
})

@query_ns.route("/getAllQuery")
class GetAllQueries(Resource):
    @token_required
    def get(self):
        queries = Query.query.all()
        return [{
            "id": q.id,
            "question": q.question,
            "created_at": q.created_at.isoformat() if q.created_at else None,
            "solved_at": q.solved_at.isoformat() if q.solved_at else None,
            "user_id_post": q.user_id_post,
            "user_id_response": q.user_id_response,
            "answer": q.answer
        } for q in queries]

@query_ns.route("/getAllQueryById")
class GetAllQueries(Resource):
    @token_required
    def get(self):
        userid = request.user["sub"]
        queries = Query.query.filter_by(user_id_post=userid).all()

        return [{
            "id": q.id,
            "question": q.question,
            "created_at": q.created_at.isoformat() if q.created_at else None,
            "solved_at": q.solved_at.isoformat() if q.solved_at else None,
            "user_id_post": q.user_id_post,
            "username_post": q.user.username,  # Username of the user who posted the query
            "user_id_response": q.user_id_response,
            "username_response": q.response_user.username if q.response_user else None,  # Username of the user who responded
            "answer": q.answer
        } for q in queries]


@query_ns.route("/postQuery")
class PostQuery(Resource):
    @token_required
    @query_ns.expect(query_model)
    def post(self):
        data = request.json
        q = Query(
            user_id_post=request.user["sub"],
            question=data["question"],
            created_at=datetime.utcnow()
        )
        db.session.add(q)
        db.session.commit()
        return {"message": "Query posted"}, 201



@query_ns.route("/getQueryById/<int:id>")
class GetQueryById(Resource):
    @token_required
    def get(self, id):
        q = Query.query.get_or_404(id)
        return {
            "id": q.id,
            "question": q.question,
            "created_at": q.created_at.isoformat() if q.created_at else None,
            "solved_at": q.solved_at.isoformat() if q.solved_at else None,
            "user_id_post": q.user_id_post,
            "user_id_response": q.user_id_response
        }

        

@query_ns.route("/editQuery/<int:id>")
class EditQuery(Resource):
    @token_required
    @query_ns.expect(query_model)
    def put(self, id):
        q = Query.query.get_or_404(id)
        print (q.user_id_post)
        print (request.user["sub"])
        if q.user_id_post != int(request.user["sub"]):
            return {"message": "Unauthorized"}, 403
        q.question = request.json["question"]
        db.session.commit()
        return {"message": "Query updated"}

@query_ns.route("/deleteQuery/<int:id>")
class DeleteQuery(Resource):
    @token_required
    def delete(self, id):
        q = Query.query.get_or_404(id)
        if q.user_id_post != int(request.user["sub"]):
            return {"message": "Unauthorized"}, 403
        db.session.delete(q)
        db.session.commit()
        return {"message": "Query deleted"}

@query_ns.route("/solve/<int:id>")
class SolveQuery(Resource):
    @token_required
    @query_ns.expect(answer_model)
    def post(self, id):
        q = Query.query.get_or_404(id)
        q.user_id_response = request.user["sub"]
        data = request.json
        q.answer = data["answer"]
        q.solved_at = datetime.utcnow()
        db.session.commit()
        return {"message": "Query marked as solved"}


