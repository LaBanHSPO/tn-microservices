from marshmallow import Schema, fields, INCLUDE


class AnySchema(Schema):
    class Meta:
        unknown = INCLUDE


class SampleSchema(Schema):
    id = fields.Integer()
    name = fields.String(required=True)
    email = fields.String(required=True)
    created_at = fields.Date(allow_none=True)
    updated_at = fields.Date(allow_none=True)


class InboundItemSchema(Schema):
    product_id = fields.Integer()
    product_sku = fields.String()
    product_name = fields.String()
    product_barcode = fields.String(allow_none=True)
    quantity = fields.Integer()
    uom = fields.String(allow_none=True)
    receive_notes = fields.String(allow_none=True, default="")


class InboundSchema(Schema):
    id = fields.Integer()
    document_ref = fields.String()
    receive_by = fields.String(allow_none=True)
    items = fields.List(fields.Nested(InboundItemSchema), allow_none=False)
    status = fields.String(default='NEW')


class InboundSchemaResponse(InboundSchema):
    pass
