from flask import Flask
from .api import (health)

app = Flask(__name__)

# Routes
app.register_blueprint(health.api)
