
from flask import Blueprint, jsonify
from .constants import GET

RESOURCE = 'health'
PATH = f'/api/v1/{RESOURCE}/'
api = Blueprint(RESOURCE, __name__, url_prefix=PATH)


@api.route('/', methods=[GET])
def get():
    return jsonify({'status': 'OK' })
