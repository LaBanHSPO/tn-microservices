from sqlalchemy import Enum

InboundStatus = Enum('NEW', 'PROCESSING', 'DONE', 'PENDING', 'CANCELLED')
OrderStatus = Enum('NEW', 'MISSING', 'ALLOCATED', 'PICKING', 'PACKING', 'SHIPPING', 'DONE', 'CANCELLED')
InventoryStatus = Enum('READY', 'LOCK')

