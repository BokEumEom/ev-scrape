# app/models/__init__.py
from .users import User
from .community import CommunityPost, CommunityPostLike, Comment
from .news import News, Vote, Region
from .vehicle import VehicleSpec

__all__ = [
    "User",
    "CommunityPost",
    "CommunityPostLike",
    "Comment",
    "News",
    "Region",
    "Vote",
    "Like",
    "VehicleSpec",
]