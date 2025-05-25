from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restx import Api
from flask_cors import CORS
from models import db
from config import Config
from auth_routes import auth_ns
from query_routes import query_ns

# Initialize Flask App
app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
from flask_cors import CORS

CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# CORS(app)

# Swagger Authorizations Setup
authorizations = {
    "Bearer Auth": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization",
        "description": "Enter JWT token like: **Bearer &lt;your_token&gt;**"
    }
}

# Initialize RESTx API with Swagger config
api = Api(
    app,
    title="Query API",
    version="1.0",
    description="Manage user queries with JWT authentication",
    doc="/",  # Swagger UI served at root
    authorizations=authorizations,
    security="Bearer Auth"  # Apply security globally
)

# Register Namespaces
api.add_namespace(auth_ns, path="/auth")
api.add_namespace(query_ns, path="/query")

# Entry Point
if __name__ == "__main__":
    app.run(debug=True)




