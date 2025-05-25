

import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = "your_secret_key"
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", f"sqlite:///{os.path.join(basedir, 'app.db')}")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USERNAME = 'rohini.c.2024.mecse@rajalakshmi.edu.in'
    MAIL_PASSWORD = 'aklp xqth hvkr gymm'
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False

    
