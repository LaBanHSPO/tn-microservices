import os
from flask import Flask, flash, request, redirect, send_file, url_for, render_template
from celery import Celery
from config import get_config
import enum
from tasks import echo, send_mail, new_order


app = Flask(__name__, template_folder=".")

class Tasks(enum.Enum):
    ECHO = 'echo'
    SEND_EMAIL = "send_mail"
    NEW_ORDER = "new_order"


def taskSwitcher(x):
    switcher = {
        Tasks.ECHO: echo
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
