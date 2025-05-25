
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)  # In production, store hashed passwords!
    phone_number = db.Column(db.String(20), nullable=True)
    
    # Define the back_populates for the queries relationship
    queries = db.relationship('Query', back_populates='user', foreign_keys='Query.user_id_post')

    def __repr__(self):
        return f"<User {self.username}>"
    
class Query(db.Model):
    __tablename__ = 'queries'
    id = db.Column(db.Integer, primary_key=True)
    user_id_post = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_id_response = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    solved_at = db.Column(db.DateTime, nullable=True)
    question = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text)

    # Relationship for the user who posted the query
    user = db.relationship('User', back_populates='queries', foreign_keys=[user_id_post])
    
    # Relationship for the user who responded to the query (if exists)
    response_user = db.relationship('User', backref='responses', foreign_keys=[user_id_response])

    def __repr__(self):
        return f"<Query {self.id} from User {self.user_id_post}>"
    



"""class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)  # In production, store hashed passwords!
    phone_number = db.Column(db.String(20), nullable=True)
    queries = db.relationship('Query',back_populates = 'users')


    def __repr__(self):
        return f"<User {self.username}>"

class Query(db.Model):
    __tablename__ = 'queries'
    id = db.Column(db.Integer, primary_key=True)
    # The user posting the query.
    user_id_post = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # The user responding to the query. It can be nullable if no one has responded.
    user_id_response = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    solved_at = db.Column(db.DateTime, nullable=True)
    question = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text)
    user = db.relationship('User',back_populates = 'queries')

    def __repr__(self):
        return f"<Query {self.id} from User {self.user_id_post}>"""
