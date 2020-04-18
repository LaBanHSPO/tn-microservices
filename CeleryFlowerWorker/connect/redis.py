import redis
from config import get_config

class RedisClient(object):

    def __init__(self):
        HOST = get_config('REDIS_HOST')
        PORT = get_config('REDIS_PORT')
        PASSWORD = get_config('REDIS_PASSWORD')
        client = redis.Redis(host=HOST, port=PORT, password=PASSWORD)

    def h_get_int(h_key, key):
        return self.client.hincr(h_key, key, 0)
    
    def get_int(key):
        return self.client.incr(key, 0)
