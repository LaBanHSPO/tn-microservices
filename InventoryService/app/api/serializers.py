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


class InboundSchema(Schema):
    id = fields.Integer()
    document_ref = fields.String()
    inbound_date = fields.Date(allow_none=True)
    status = fields.String()
    receive_by = fields.String()
    created_at = fields.Date(allow_none=True)
    updated_at = fields.Date(allow_none=True)
