"""empty message

Revision ID: 4289b83722b8
Revises: c8b0473aa41f
Create Date: 2023-05-19 08:04:51.628518

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4289b83722b8'
down_revision = 'c8b0473aa41f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))

    # ### end Alembic commands ###
