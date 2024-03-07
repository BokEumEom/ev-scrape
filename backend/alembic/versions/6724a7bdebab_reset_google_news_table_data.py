"""Reset google_news table data

Revision ID: 6724a7bdebab
Revises: c31acb85fec3
Create Date: 2024-03-05 17:19:01.627923

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6724a7bdebab'
down_revision: Union[str, None] = 'c31acb85fec3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
