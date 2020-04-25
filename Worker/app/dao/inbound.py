from app.dao import db
from datetime import datetime
from .schema import InboundModel as Inbound, InboundItemModel as InboundItem


def find_all(session):
    return db.all(session, Inbound)


def find_by_id(session, id):
    return db.query_first(session, Inbound, (Inbound.id == id))


def find_by_ref(session, document_ref):
    return db.query_first(session, Inbound, (Inbound.document_ref == document_ref))


def create(session, model):
    document_ref = model['document_ref']
    if find_by_ref(session, document_ref):
        raise Exception(400, {
            'error_code': 'DUPLICATED',
            'msg': f'Inbound ref {document_ref} existed'
        })
    inbound_items = list(InboundItem(**{
                            'product_id': i['product_id'],
                            "product_sku": i['product_sku'],
                            "product_name": i['product_name'],
                            "product_barcode": i['product_barcode'],
                            "quantity": i['quantity'],
                            "uom": i['uom'],
                        }) for i in model['items'])
    inbound = Inbound()
    inbound.items = inbound_items
    inbound.document_ref = document_ref
    db.insert(session, inbound)
    return find_by_ref(session, document_ref)


def update(session, id, model):
    if find_by_id(session, id):
        model['updated_at'] = datetime.today()
        db.update(session, Inbound, (Inbound.id == id), model)
        return find_by_id(session, id)
    raise Exception(404, {'msg': f'Inbound id: {id} not found'})


def delete(session, id):
    if find_by_id(session, id):
        db.delete(session, Inbound, (Inbound.id == id))
        return True
    raise Exception(404, {'msg': f'Inbound id: {id} not found'})
