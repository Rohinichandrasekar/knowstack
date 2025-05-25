from flask_restx import Namespace, Resource, fields
from flask import request
from models import db, User
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
from flask import current_app
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

auth_ns = Namespace("auth", description="Authentication operations")

register_model = auth_ns.model("Register", {
    "username": fields.String(required=True),
    "email": fields.String(required=True),
    "password": fields.String(required=True),
    "phone_number": fields.String()
})

login_model = auth_ns.model("Login", {
    "username": fields.String(required=True),
    "password": fields.String(required=True)
})


@auth_ns.route("/register")
class Register(Resource):
    @auth_ns.expect(register_model)
    def post(self):
        data = request.json
        hashed_password = generate_password_hash(data["password"])
        user = User(
            username=data["username"],
            email=data["email"],
            password=hashed_password,
            phone_number=data.get("phone_number")
        )
        db.session.add(user)
        db.session.commit()

        # Send email
        try:
            sender_email = current_app.config['MAIL_USERNAME']
            receiver_email = data["email"]
            password = current_app.config['MAIL_PASSWORD']

            msg = MIMEMultipart("alternative")
            msg["Subject"] = "Registration Successful"
            msg["From"] = sender_email
            msg["To"] = receiver_email

            text = f"""Hi {data["username"]},You have successfully registered to our platform!"""
            msg.attach(MIMEText(text, "plain"))

            with smtplib.SMTP(current_app.config['MAIL_SERVER'], current_app.config['MAIL_PORT']) as server:
                server.starttls()
                server.login(sender_email, password)
                server.sendmail(sender_email, receiver_email, msg.as_string())

        except Exception as e:
            return {"message": "User registered, but email failed to send", "error": str(e)}, 201

        return {"message": "User registered successfully, email sent"}, 201

'''@auth_ns.route("/register")
class Register(Resource):
    @auth_ns.expect(register_model)
    def post(self):
        data = request.json
        hashed_password = generate_password_hash(data["password"])
        user = User(username=data["username"], email=data["email"], password=hashed_password, phone_number=data.get("phone_number"))
        db.session.add(user)
        db.session.commit()
        return {"message": "User registered successfully"}, 201'''

@auth_ns.route("/login")
class Login(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        data = request.json
        user = User.query.filter((User.username == data["username"]) | (User.email == data["username"])).first()
        if user and check_password_hash(user.password, data["password"]):
            payload = {
                "sub": str(user.id),
                "username": user.username,
                "email": user.email,
                "exp": datetime.utcnow() + timedelta(hours=1)
            }
            token = jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")
            return {"token": token}, 200
        return {"message": "Invalid credentials"}, 401