from .community import (
    get_community_posts,
    get_community_post,
    get_community_posts_with_count,
    create_community_post,
    update_community_post,
    delete_community_post,
    like_community_post,
    create_comment,
    get_comments_by_post_id,
    delete_comment,
)
from .news import (
    create_news,
    get_news,
    get_news_count,
    get_news_by_id,
    update_news,
    delete_news,
    vote_news,
)
from .users import (
    get_user,
    get_user_by_email,
    create_user,
    get_users,
    get_user_posts,
)
from .vehicle import (
    create_vehicle_spec,
    get_vehicle_specs,
    get_vehicle_specs_by_manufacturer,
    get_vehicle_spec_by_model,
    update_vehicle_spec,
    delete_vehicle_spec,
)
