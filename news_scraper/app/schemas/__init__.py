# Importing all classes and models from community.py
from .community import (
    CommunityPostBase,
    CommunityPostCreate,
    CommunityPost,
    CommunityPostsResponse,
    CommunityPostUpdate,
    CommentBase,
    CommentCreate,
    Comment
)

# Importing all classes and models from ev_registration.py
from .ev_registration import (
    EVRegistrationBase,
    EVRegistrationCreate,
    EVRegistrationUpdate,
    EVRegistration
)

# Importing all classes and models from news.py
from .news import (
    NewsBase,
    NewsCreate,
    News,
    NewsResponse,
    VoteCreate
)

# Importing all classes and models from users.py
from .users import (
    UserBase,
    UserCreate,
    User
)

# Importing all classes and models from vehicle.py
from .vehicle import (
    VehicleSpecBase,
    VehicleSpecCreate,
    VehicleSpec
)
