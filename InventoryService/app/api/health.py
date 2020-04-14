
from flask import Blueprint, jsonify
from .constants import GET, COUNTER
from app.redis import RedisClient

RESOURCE = 'health'
PATH = f'/api/v1/{RESOURCE}/'
api = Blueprint(RESOURCE, __name__, url_prefix=PATH)


@api.route('/', methods=[GET])
def get():
    COUNTER.labels(GET, PATH).inc()
    client = RedisClient()
    health_status = client.conn.get('health_status')
    return jsonify({'status': health_status })
