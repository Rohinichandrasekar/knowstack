import jwt
from functools import wraps
from flask import request, current_app

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return {"message": "Token is missing"}, 401

        try:
            token = auth_header.split(" ")[1]
            data =jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            request.user = data
            print(request.user)
        except jwt.ExpiredSignatureError:
            return {"message": "Token has expired"}, 401
        except jwt.InvalidTokenError as e:
            print("JWT decode error:", str(e))  # Optional for debugging
            return {"message": "Invalid token"}, 401

        return f(*args, **kwargs)
    return decorated

