from flask import Blueprint, request, jsonify
from app.dao import inbound as db
from app.dao.context import create_context
from app.utils.logger import get_logger
from .constants import GET, POST, PUT, DELETE, COUNTER
from .error_handler import process_error
from .serializers import InboundSchema, InboundSchemaResponse


RESOURCE = 'inbounds'
PATH = f'/api/v1/{RESOURCE}/'

schema = InboundSchema()
responseSchema = InboundSchemaResponse()
api = Blueprint(RESOURCE, __name__, url_prefix=PATH)
log = get_logger(__name__)


@api.errorhandler(Exception)
def error_handler(error):
    return process_error(error)


@api.route('/', methods=[GET])
def find_all():
    """return list of inbounds
    ---
    tags:
      - Inbound
    responses:
      200:
        description: A list inbounds
        schema:
          id: inboundResponse
          properties:
            id:
              type: integer
            name:
              type: string
            email:
              type: string

    """
    log.debug(f'GET {PATH}')
    COUNTER.labels(GET, PATH).inc()
    with create_context() as context:
        session = context['session']
        results = db.find_all(session)
        if results:
            results = jsonify([schema.dump(u) for u in results])
            return results, 200
        return jsonify({
             'OK': 1
        }), 200


@api.route('/', methods=[POST])
def create():
    """create new Inbound
    ---
    tags:
      - Inbound
    parameters:
      - name: body
        in: body
        required: true
        schema:
          id: inboundRequest
          required:
            - document_ref
            - items
          properties:
            document_ref:
              type: string
              example: "PO_16_04_2020_1"
            items:
               type: array
               items:
                 schema:
                    id: InboundItem
                    required:
                        - product_id
                        - product_sku
                        - quantity
                    properties:
                        product_id:
                            type: number
                            example: 1
                        product_sku:
                            type: string
                            description: "Mã SKU"
                            example: "SP1"
                        product_name:
                            type: string
                            description: "Tên sản phẩm"
                            example: ""
                        product_barcode:
                            type: string
                            description: "Mã vạch"
                            example: ""
                        quantity:
                            type: number
                            example: 1
                        uom:
                            type: string
                            enum: [PCS]
                            description: >-
                                Đơn vị tính. PCS (cái/chiếc)
                            default: "PCS"
                            example: "PCS"
    responses:
      201:
        description: Created new inbound
        schema:
          $ref: '#/definitions/inboundResponse'
      400:
        description: Invalid any property
        schema:
          id: ErrorResponse
          properties:
            msg:
              type: string
    """
    log.debug(f'POST {PATH}')
    COUNTER.labels(POST, PATH).inc()
    body = request.get_json()
    schema.load(body)
    """ validation rule
        1. [EMPTY_ITEMS] item list is not empty
        2. [DUPLICATED_ITEM] item list is has duplicated item {item}
        3. [DUPLICATED] existed document_ref inbound in db 
    """
    items = body['items']
    # 1
    if len(items) == 0:
        return {
            'error_code': 'EMPTY_ITEMS',
            'msg': 'item list is not empty'
        }, 400
    # 2
    product_items = [i['product_id'] for i in items]
    diff_items = [x for x in set(product_items) if product_items.count(x) > 1]
    if len(diff_items):
        return {
            'error_code': 'DUPLICATED_ITEM',
            'msg': diff_items
        }, 400
    with create_context() as context:
        session = context['session']
        inbound = db.create(session, body)
        print("inboud ----->", inbound)
        result = responseSchema.dump(inbound)
        return result, 200


@api.route('/<int:id>', methods=[GET])
def find_by_id(id):
    """Return a inbound by id
    ---
    tags:
      - Inbound
    parameters:
      - name: id
        in: path
        type: integer
        required: true
    responses:
      200:
        description: One inbound by id
        schema:
          $ref: '#/definitions/inboundResponse'
      400:
        description: Invalid any inbound property
        schema:
          $ref: '#/definitions/ErrorResponse'
      404:
        description: inbound not found
        schema:
          $ref: '#/definitions/ErrorResponse'
    """
    log.debug(f'GET {PATH}/{id}')
    COUNTER.labels(GET, PATH.join(f'/{id}')).inc()
    with create_context() as context:
        session = context['session']
        model = db.find_by_id(session, id)
        if model:
            return schema.dump(model), 200
        return '', 404


@api.route('/<int:id>', methods=[PUT])
def update(id):
    """Update a existing inbound
    ---
    tags:
      - Inbound
    parameters:
      - name: id
        in: path
        type: integer
        required: true
      - name: body
        in: body
        required: true
        schema:
          $ref: '#/definitions/inboundRequest'
    responses:
      201:
        description: Created new inbound
        schema:
          $ref: '#/definitions/inboundResponse'
      400:
        description: Invalid any inbound property
        schema:
          $ref: '#/definitions/ErrorResponse'
      404:
        description: inbound not found
        schema:
          $ref: '#/definitions/ErrorResponse'
    """
    log.debug(f'PUT {PATH}/{id}')
    COUNTER.labels(PUT, PATH.join(f'/{id}')).inc()
    body = request.get_json()
    schema.load(body)
    with create_context() as context:
        session = context['session']
        model = db.update(session, id, body)
        if model:
            return schema.dump(model), 200
        return '', 404


@api.route('/<int:id>', methods=[DELETE])
def delete(id):
    """Remove on existing inbound
    ---
    tags:
      - Inbound
    parameters:
      - name: id
        in: path
        type: integer
        required: true
    responses:
      204:
        description: inbound deleted
      404:
        description: inbound not found
        schema:
          $ref: '#/definitions/ErrorResponse'
    """
    log.debug(f'DELETE {PATH}/{id}')
    COUNTER.labels(DELETE, PATH.join(f'/{id}')).inc()
    with create_context() as context:
        session = context['session']
        model = db.delete(session, id)
        if model:
            return '', 204
        return '', 404
