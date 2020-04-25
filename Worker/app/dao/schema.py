from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column,String,Sequence,Integer,Enum,Date,ForeignKey
from sqlalchemy.orm import relationship
from .status_enum import OrderStatus, InventoryStatus, InboundStatus


Base = declarative_base()


def on_inbound_update(context):
    print('inbound_update_hook:', context.get_current_parameters())
    return datetime.now


class ProductModel(Base):
    __tablename__ = 'product'
    id = Column(Integer, Sequence('product_id_seq'), primary_key=True)


class InboundItemModel(Base):
    __tablename__ = 'inbound_item'
    id = Column(Integer, Sequence('inbound_item_id_seq'), primary_key=True)
    inbound_id = Column(Integer, ForeignKey("inbound.id"), nullable=False)
    product_id = Column(Integer, nullable=False) # ForeignKey("product.id")
    product_sku = Column(String(255), nullable=False, info="Mã SKU sản phẩm")
    product_name = Column(String(255), nullable=False)
    product_barcode = Column(String(20))
    quantity = Column(Integer)
    uom = Column(Enum('PCS'), default='PCS', info="Đơn vị tính")
    receive_notes = Column(String(255))
    loc_code = Column(String(20), info="Nhận trực tiếp vào vị trí")
    updated_at = Column(Date(), onupdate=datetime.now)

    def __repr__(self):
        return '<InboundItemModel {} Inbound {}>'.format(self.id, self.inbound_id)


class InboundModel(Base):
    __tablename__ = 'inbound'
    id = Column(Integer, Sequence('inbound_id_seq'), primary_key=True)
    document_ref = Column(String(255), info="Mã tham chiếu / chứng từ")
    inbound_date = Column(Date())
    status = Column(InboundStatus, default="NEW")
    receive_by = Column(String(50), info="Người nhận hàng")
    items = relationship(InboundItemModel, backref="inbound")
    created_at = Column(Date(), nullable=False, default=datetime.now)
    updated_at = Column(Date(), onupdate=on_inbound_update)

    def __repr__(self):
        return '<InboundModel {} Ref: {}>'.format(self.id, self.document_ref)


class InventoryModel(Base):
    __tablename__ = 'inventory'
    id = Column(Integer, Sequence('inventory_id_seq'), primary_key=True)
    document_ref = Column(String(50), index=True)
    inbound_id = Column(Integer, nullable=False, index=True)
    product_id = Column(Integer, ForeignKey("product.id"), nullable=False, index=True)
    product_sku = Column(String(255), nullable=False, index=True)
    product_name = Column(String(255), nullable=False)
    product_barcode = Column(String(20), index=True)
    status = Column(InventoryStatus)
    quantity = Column(Integer, nullable=False)
    uom = Column(Enum('PCS'), default='PCS')
    loc_code = Column(String(20), nullable=False, index=True)
    created_at = Column(Date(), nullable=False)
    updated_at = Column(Date())


class OrderItemModel(Base):
    __tablename__ = 'order_item'
    id = Column(Integer, Sequence('order_detail_id_seq'), primary_key=True)
    document_ref = Column(String(50))
    order_id = Column(Integer, ForeignKey("order.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("product.id"), nullable=False)
    product_sku = Column(String(255), nullable=False)
    product_name = Column(String(255), nullable=False)
    product_barcode = Column(String(20))
    quantity = Column(Integer)
    uom = Column(Enum('PCS'), default='PCS')
    loc_code = Column(String(20))
    updated_at = Column(Date())


class OrderModel(Base):
    __tablename__ = 'order'
    id = Column(Integer, Sequence('order_id_seq'), primary_key=True)
    status = Column(OrderStatus)
    document_ref = Column(String(50))
    receiver_name = Column(String(255), nullable=False)
    receiver_phone = Column(String(15), nullable=False)
    receiver_address = Column(String(255), nullable=False)
    ship_code = Column(String(50))
    order_notes = Column(String(255))
    items = relationship(OrderItemModel, backref="order")
    created_at = Column(Date(), nullable=False)
    updated_at = Column(Date())


class PickupModel(Base):
    __tablename__ = 'pickup'
    id = Column(Integer, Sequence('pickup_id_seq'), primary_key=True)
    status = Column(Enum('NEW', 'PICKING', 'DONE', 'PENDING', 'CANCELLED'))
    pick_by = Column(String(50), info="Người lấy hàng")
    order_id = Column(Integer, ForeignKey("order.id"), nullable=False)
    pick_notes = Column(String(255))
    created_at = Column(Date(), nullable=False)
    updated_at = Column(Date())


class PackModel(Base):
    __tablename__ = 'pack'
    id = Column(Integer, Sequence('pack_id_seq'), primary_key=True)
    status = Column(Enum('NEW', 'PACKING', 'DONE', 'PENDING', 'CANCELLED'))
    packed_by = Column(String(50), info="Người đóng gói")
    order_id = Column(Integer, ForeignKey("order.id"), nullable=False)
    ship_code = Column(String(50), info="Mã vận đơn")
    pack_notes = Column(String(255))
    created_at = Column(Date(), nullable=False)
    updated_at = Column(Date())


class ShipModel(Base):
    __tablename__ = 'ship'
    id = Column(Integer, Sequence('ship_id_seq'), primary_key=True)
    status = Column(Enum('NEW', 'SHIPPING', 'DONE', 'CANCELLED'))
    shipped_by = Column(String(50))
    order_id = Column(Integer, ForeignKey("order.id"), nullable=False)
    created_at = Column(Date(), nullable=False)
    updated_at = Column(Date())


class Sample(Base):
    __tablename__ = 'samples'
    id = Column(Integer, Sequence('sample_id_seq'), primary_key=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    created_at = Column(Date(), nullable=False)
    updated_at = Column(Date())
