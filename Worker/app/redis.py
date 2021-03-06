import redis
from app.utils.config import get_config

class Singleton(type):
    """
    An metaclass for singleton purpose. Every singleton class should inherit from this class by 'metaclass=Singleton'.
    """
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class RedisClient(object):

    def __init__(self):
        HOST = get_config('REDIS_HOST')
        PORT = get_config('REDIS_PORT')
        PASSWORD = get_config('REDIS_PASSWORD')
        self.pool = redis.ConnectionPool(host = HOST, port = PORT, password = PASSWORD, decode_responses=True)

    @property
    def conn(self):
        if not hasattr(self, '_conn'):
            self.getConnection()
        return self._conn

    def getConnection(self):
        self._conn = redis.Redis(connection_pool = self.pool)