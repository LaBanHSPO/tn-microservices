from flask_mail import Mail, Message
from app.redis import redis


def create_order(data):
    """ Function to create order
    """
    print('data: ', data)


def update_redis_quantity(data):
    """Function to update redis quantity
    """
    x = redis.h_get_int('quantity_on_hand', 'SP1')
    print('x: ', x)


def send_telegram(data):
    """ Function to send telegram notification
    """
    print('Sending message to telegram channel')