"""empty message

Revision ID: b64c61bf2459
Revises: 
Create Date: 2023-05-03 13:24:09.364652

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b64c61bf2459'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('schedule',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('day', sa.String(length=255), nullable=False),
    sa.Column('opening', sa.Time(), nullable=False),
    sa.Column('closing', sa.Time(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('party_size', sa.Integer(), nullable=False),
    sa.Column('is_reserved', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('table_set_up',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('table_size', sa.Integer(), nullable=False),
    sa.Column('num_of_tables', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=255), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=255), nullable=False),
    sa.Column('last_name', sa.String(length=255), nullable=False),
    sa.Column('phone', sa.Integer(), nullable=False),
    sa.Column('is_admin', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('phone'),
    sa.UniqueConstraint('username')
    )
    op.create_table('car',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('make', sa.String(length=255), nullable=False),
    sa.Column('model', sa.String(length=255), nullable=False),
    sa.Column('year', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reservations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('time', sa.Time(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('party_count', sa.Integer(), nullable=False),
    sa.Column('costumer_id', sa.Integer(), nullable=True),
    sa.Column('table_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['costumer_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['table_id'], ['table.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('review_text', sa.Text(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('customer_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['customer_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('used_tables',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('day', sa.Date(), nullable=False),
    sa.Column('hour', sa.Time(), nullable=False),
    sa.Column('table_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['table_id'], ['table.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('wait__list',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('reservation_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['reservation_id'], ['reservations.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('wait__list')
    op.drop_table('used_tables')
    op.drop_table('reviews')
    op.drop_table('reservations')
    op.drop_table('car')
    op.drop_table('user')
    op.drop_table('table_set_up')
    op.drop_table('table')
    op.drop_table('schedule')
    # ### end Alembic commands ###