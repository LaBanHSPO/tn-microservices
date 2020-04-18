from flask_mail import Mail, Message
from celery import Celery
from config import get_config

def send_mail(data):
    """ Function to send emails in the background.
    """
    msg = Message("Ping!",
                sender="admin.ping",
                recipients=[""])
    msg.body = "message"        
    mail.send(msg)
