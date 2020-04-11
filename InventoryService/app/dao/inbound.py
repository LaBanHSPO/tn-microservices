from app.dao import db
from datetime import datetime
from .schema import Inbound


def find_all(session):
    return db.all(session, Inbound)


def find_by_id(session, id):
    return db.query_first(session, Inbound, (Inbound.id == id))


def find_by_email(session, email):
    return db.query_first(session, Inbound, (Inbound.email == email))


def create(session, model):
    email = model['email']
    user = find_by_email(session, email)
    if not user:
        user = Inbound(**model)
        user.created_at = datetime.today()
        db.insert(session, user)
        return find_by_email(session, email)
    raise Exception(400, {'msg': f'Inbound email:{email} already exists'})


def update(session, id, model):
    if find_by_id(session, id):
        model['updated_at'] = datetime.today()
        db.update(session, Inbound, (Inbound.id == id), model)
        return find_by_id(session, id)
    raise Exception(404, {'msg': f'Inbound id:{id} not found'})


def delete(session, id):
    if find_by_id(session, id):
        db.delete(session, Inbound, (Inbound.id == id))
        return True
    raise Exception(404, {'msg': f'Inbound id:{id} not found'})
