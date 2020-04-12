from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import (Column,
                        String,
                        Sequence,
                        Integer,
                        Enum,
                        Date)


Base = declarative_base()


class Inbound(Base):
    __tablename__ = 'inbounds'
    id = Column(Integer, Sequence('inbound_id_seq'), primary_key=True)
    document_ref = Column(String(255), unique=True)
    inbound_date = Column(Date(), nullable=False)
    status = Column(Enum('NEW', 'PROCESSING', 'DONE', 'PENDING', 'CANCELLED'), default='NEW')
    receive_by = Column(String(50), info="Người nhận hàng")
    created_at = Column(Date(), nullable=False)
    updated_at = Column(Date())
    # simple: 1 inbound 1 sku
    product_id = Column(Integer, nullable=False)
    product_sku = Column(String(255), nullable=False)
    product_name = Column(String(255), nullable=False)
    product_barcode = Column(String(20))
    uom = Column(Enum('PCS'), default='PCS')


class InboundDetail(Base):
    __tablename__ = 'inbound_details'
    id = Column(Integer, Sequence('inbound_detail_id_seq'), primary_key=True)
    inbound_id = Column(Integer, nullable=False)
    document_ref = Column(String(50))
    product_id = Column(Integer, nullable=False)
    product_sku = Column(String(255), nullable=False)
    product_name = Column(String(255), nullable=False)
    product_barcode = Column(String(20))
    quantity = Column(Integer)
    uom = Column(Enum('PCS'), default='PCS')
    receive_notes = Column(String(255))
    loc_code = Column(String(20))
    updated_at = Column(Date())


class Inventory(Base):
    __tablename__ = 'inventories'
    id = Column(Integer, Sequence('inventory_id_seq'), primary_key=True)
    document_ref = Column(String(50), index=True)
    inbound_id = Column(Integer, nullable=False, index=True)
    product_id = Column(Integer, nullable=False, index=True)
    product_sku = Column(String(255), nullable=False, index=True)
    product_name = Column(String(255), nullable=False)
    product_barcode = Column(String(20), index=True)
    status = Column(Enum('READY', 'LOCK'), nullable=False)
    quantity = Column(Integer, nullable=False)
    uom = Column(Enum('PCS'), default='PCS')
    loc_code = Column(String(20), nullable=False, index=True)
    created_at = Column(Date(), nullable=False)
    updated_at = Column(Date())


class Order(Base):
    __tablename__ = 'orders'
    id = Column(Integer, Sequence('order_id_seq'), primary_key=True)
    status = Column(Enum('NEW', 'MISSING', 'ALLOCATED', 'PICKING', 'PACKING', 'SHIPPING', 'DONE', 'CANCELLED'), default='NEW')
    document_ref = Column(String(50))
    receiver_name = Column(String(255), nullable=False)
    receiver_phone = Column(String(15), nullable=False)
    receiver_address = Column(String(255), nullable=False)
    ship_code = Column(String(50))
    order_notes = Column(String(255))
    created_at = Column(Date(), nullable=False)
    updated_at = Column(Date())
    # simple: 1 order 1 sku
    product_id = Column(Integer, nullable=False)
    product_sku = Column(String(255), nullable=False)
    product_name = Column(String(255), nullable=False)
    product_barcode = Column(String(20))
    uom = Column(Enum('PCS'), default='PCS')


class OrderDetail(Base):
    __tablename__ = 'order_details'
    id = Column(Integer, Sequence('order_detail_id_seq'), primary_key=True)
    document_ref = Column(String(50))
    order_id = Column(Integer, nullable=False)
    product_id = Column(Integer, nullable=False)
    product_sku = Column(String(255), nullable=False)
    product_name = Column(String(255), nullable=False)
    product_barcode = Column(String(20))
    quantity = Column(Integer)
    uom = Column(Enum('PCS'), default='PCS')
    loc_code = Column(String(20))
    updated_at = Column(Date())


class Pickup(Base):
    __tablename__ = 'pickups'
    id = Column(Integer, Sequence('pickup_id_seq'), primary_key=True)
    status = Column(Enum('NEW', 'PICKING', 'DONE', 'PENDING', 'CANCELLED'), default='NEW')
    pick_by = Column(String(50), info="Người lấy hàng")
    order_id = Column(Integer, nullable=False)
    pick_notes = Column(String(255))
    created_at = Column(Date(), nullable=False)
    updated_at = Column(Date())


class Pack(Base):
    __tablename__ = 'packs'
    id = Column(Integer, Sequence('pack_id_seq'), primary_key=True)
    status = Column(Enum('NEW', 'PACKING', 'DONE', 'PENDING', 'CANCELLED'), default='NEW')
    packed_by = Column(String(50), info="Người đóng gói")
    order_id = Column(Integer, nullable=False, index=True)
    ship_code = Column(String(50), info="Mã vận đơn")
    pack_notes = Column(String(255))
    created_at = Column(Date(), nullable=False)
    updated_at = Column(Date())


class Ship(Base):
    __tablename__ = 'ships'
    id = Column(Integer, Sequence('ship_id_seq'), primary_key=True)
    status = Column(Enum('NEW', 'SHIPPING', 'DONE', 'CANCELLED'), default='NEW')
    shipped_by = Column(String(50))
    order_id = Column(Integer, nullable=False)
    created_at = Column(Date(), nullable=False)
    updated_at = Column(Date())


class Sample(Base):
    __tablename__ = 'samples'
    id = Column(Integer, Sequence('sample_id_seq'), primary_key=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    created_at = Column(Date(), nullable=False)
    updated_at = Column(Date())
