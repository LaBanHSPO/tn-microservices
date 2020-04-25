from app.dao import db
from datetime import datetime
from .schema import Sample


def find_all(session):
    return db.all(session, Sample)


def find_by_id(session, id):
    return db.query_first(session, Sample, (Sample.id == id))


def find_by_email(session, email):
    return db.query_first(session, Sample, (Sample.email == email))


def create(session, model):
    email = model['email']
    user = find_by_email(session, email)
    if not user:
        user = Sample(**model)
        user.created_at = datetime.today()
        db.insert(session, {})
        return find_by_email(session, email)
    raise Exception(400, {'msg': f'sample email:{email} already exists'})


def update(session, id, model):
    if find_by_id(session, id):
        model['updated_at'] = datetime.today()
        db.update(session, Sample, (Sample.id == id), model)
        return find_by_id(session, id)
    raise Exception(404, {'msg': f'sample id:{id} not found'})


def delete(session, id):
    if find_by_id(session, id):
        db.delete(session, Sample, (Sample.id == id))
        return True
    raise Exception(404, {'msg': f'sample id:{id} not found'})
