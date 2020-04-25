"""Init

Revision ID: a05fee731ca7
Revises: 
Create Date: 2020-04-15 22:45:02.121700

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'a05fee731ca7'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('inbound', sa.Column('receive_by', sa.String(length=50), nullable=True))
    op.add_column('inbound', sa.Column('status', sa.Enum('NEW', 'PROCESSING', 'DONE', 'PENDING', 'CANCELLED'), nullable=True))
    op.add_column('inbound', sa.Column('updated_at', sa.Date(), nullable=True))
    op.drop_column('inbound', 'updated_at2')
    op.add_column('inbound_item', sa.Column('updated_at', sa.Date(), nullable=True))
    op.drop_column('inbound_item', 'updated_at1')
    op.add_column('inventory', sa.Column('inbound_id', sa.Integer(), nullable=False))
    op.add_column('inventory', sa.Column('updated_at', sa.Date(), nullable=True))
    op.alter_column('inventory', 'status',
               existing_type=mysql.ENUM('READY', 'LOCK'),
               nullable=True)
    op.create_index(op.f('ix_inventory_inbound_id'), 'inventory', ['inbound_id'], unique=False)
    op.drop_column('inventory', 'updated_at3')
    op.add_column('order', sa.Column('updated_at', sa.Date(), nullable=True))
    op.drop_column('order', 'updated_at5')
    op.add_column('order_item', sa.Column('updated_at', sa.Date(), nullable=True))
    op.drop_column('order_item', 'updated_at4')
    op.add_column('pack', sa.Column('updated_at', sa.Date(), nullable=True))
    op.drop_column('pack', 'updated_at7')
    op.add_column('pickup', sa.Column('updated_at', sa.Date(), nullable=True))
    op.drop_column('pickup', 'updated_at6')
    op.add_column('samples', sa.Column('updated_at', sa.Date(), nullable=True))
    op.drop_column('samples', 'updated_at9')
    op.add_column('ship', sa.Column('updated_at', sa.Date(), nullable=True))
    op.drop_column('ship', 'updated_at8')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('ship', sa.Column('updated_at8', sa.DATE(), nullable=True))
    op.drop_column('ship', 'updated_at')
    op.add_column('samples', sa.Column('updated_at9', sa.DATE(), nullable=True))
    op.drop_column('samples', 'updated_at')
    op.add_column('pickup', sa.Column('updated_at6', sa.DATE(), nullable=True))
    op.drop_column('pickup', 'updated_at')
    op.add_column('pack', sa.Column('updated_at7', sa.DATE(), nullable=True))
    op.drop_column('pack', 'updated_at')
    op.add_column('order_item', sa.Column('updated_at4', sa.DATE(), nullable=True))
    op.drop_column('order_item', 'updated_at')
    op.add_column('order', sa.Column('updated_at5', sa.DATE(), nullable=True))
    op.drop_column('order', 'updated_at')
    op.add_column('inventory', sa.Column('updated_at3', sa.DATE(), nullable=True))
    op.drop_index(op.f('ix_inventory_inbound_id'), table_name='inventory')
    op.alter_column('inventory', 'status',
               existing_type=mysql.ENUM('READY', 'LOCK'),
               nullable=False)
    op.drop_column('inventory', 'updated_at')
    op.drop_column('inventory', 'inbound_id')
    op.add_column('inbound_item', sa.Column('updated_at1', sa.DATE(), nullable=True))
    op.drop_column('inbound_item', 'updated_at')
    op.add_column('inbound', sa.Column('updated_at2', sa.DATE(), nullable=True))
    op.drop_column('inbound', 'updated_at')
    op.drop_column('inbound', 'status')
    op.drop_column('inbound', 'receive_by')
    # ### end Alembic commands ###
