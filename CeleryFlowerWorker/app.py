import os
from flask import Flask, flash, request, redirect, send_file, url_for, render_template
from celery import Celery
from celery.app.log import TaskFormatter
import logging
from flask_mail import Mail, Message
import redis
import enum

app = Flask(__name__, template_folder=".")
print('> AppName: ', __name__)

app.config.from_object("config")
app.secret_key = app.config['SECRET_KEY']
redisClient = redis.Redis(host=app.config['REDIS_HOST'], port=app.config['REDIS_PORT'])

# set up celery client
client = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
client.conf.update(app.config)

# set up Flask-Mail Integration
mail = Mail(app)

class Tasks(enum.Enum):
    SEND_EMAIL = "send_mail"
    NEW_ORDER = "new_order"


@client.task
def send_mail(data):
    """ Function to send emails in the background.
    """
    with app.app_context():
        msg = Message("Ping!",
                    sender="admin.ping",
                    recipients=[""])
        msg.body = "message"        
        mail.send(msg)

@client.task
def new_order(data):
    """ Function to create order
        Function to update redis quantity
        Function to send telegram notification
    """
    print(f'PIDD: {os.getpid()}')
    redisClient.incr('SMT', 0)
    raise Exception('x -------')


def taskSwitcher(x):
    switcher = {
        Tasks.SEND_EMAIL.name: send_mail,
        Tasks.NEW_ORDER.name: new_order
    }
    return switcher.get(x, "nothing")

@app.route('/', methods=['GET'])
def index():
    enum_list = list(map(lambda x: x.name, Tasks))
    t = request.args.get('t')
    if t is None:
        return render_template('./docs.html', status="READY", tasks=enum_list)
    else:
        data = {}
        taskSwitcher(t).apply_async(args=[data], countdown=10)
        print(f'----- Executed: {t}  -----')
 
        return render_template('./docs.html', status=f'{t} EXECUTED!', tasks=enum_list)


if __name__ == '__main__':
    print('PID: ', os.getpid())
    app.run(debug=True)
