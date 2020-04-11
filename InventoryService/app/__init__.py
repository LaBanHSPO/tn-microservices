from flask import Flask
from flasgger import Swagger
from .api import (health, metrics, sample, inbound)


app = Flask(__name__)
swagger = Swagger(app)

# Routes
app.register_blueprint(health.api)
app.register_blueprint(metrics.api)
app.register_blueprint(sample.api)
app.register_blueprint(inbound.api)
