from app.dao import db
from app.dao.schema import Sample

def sleep(x):
    time.sleep(x)
    return x

def test():
    orders = db.all(session, Sample)