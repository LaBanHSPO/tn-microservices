from celery import Celery
# from kombu import Connection, Exchange, Queue
from sentry_sdk import init as sentry_init
import time
import logging
from app.utils.config import get_config
from actions.order import create_order, update_redis_quantity, send_telegram
from actions.email import send_mail
from actions.common import test

celery = Celery('tasks', broker=get_config('CELERY_BROKER_URL'))
SENTRY_DSN = get_config('SENTRY_DSN')
if SENTRY_DSN:
    sentry_init(SENTRY_DSN)

# celery.conf.update(
#     CELERY_DEFAULT_QUEUE = 'celery_queue',
#     CELERY_DEFAULT_EXCHANGE = 'celery',
#     CELERY_DEFAULT_EXCHANGE_TYPE = 'direct',
#     CELERY_RESULT_BACKEND = 'rpc://',
#     CELERY_RESULT_PERSISTENT = True,
#     CELERY_QUEUES = (
#         Queue('celery',    routing_key="celery"),
#         Queue('case_creation',       routing_key='create.#')
#     ),
# )

# celery.conf.task_routes = {
#         'case.tasks.create_case': {
#             'queue': 'case_creation',
#             'routing_key': 'create.1'
#         },
#         'print.tasks.connect_and_serve': {
#             'queue': 'celery_queue',
#             'routing_key': 'celery'
#         }
# }


@celery.task
def echo(msg):
    return msg        


@celery.task
def current_time():
    return time.time()


def error(msg):
    raise Exception(msg)


@celery.task
def test():
    test()
    logging.info('This is example log')


@celery.task
def new_order(data):
    create_order(data)
    update_redis_quantity(data)
    send_telegram(data)


@celery.task
def notification(data):
    send_mail(data)

