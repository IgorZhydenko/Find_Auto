from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from api.views import PostView, UsersView, UserPostView, PostUploadsView, BookmarkView, PostBookmarkedView
from django.urls import include
from django.urls import path, re_path

swagger_schema = get_schema_view(
    openapi.Info(
        title='Find Auto',
        default_version='v1.0',
        terms_of_service='https://www.google.com/policies/terms/',
        license=openapi.License(name='BSD License'),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

posts_router = DefaultRouter()
posts_router.register(r'', PostView, basename='posts')

my_posts_router = DefaultRouter()
my_posts_router.register(r'', UserPostView, basename='my_posts')

users_router = DefaultRouter()
users_router.register(r'', UsersView)

bookmark_router = DefaultRouter()
bookmark_router.register(r'', BookmarkView)

post_bookmarked_router = DefaultRouter()
post_bookmarked_router.register(r'', PostBookmarkedView)

posts_uploads_router = DefaultRouter()
posts_uploads_router.register(r'', PostUploadsView, basename='posts')

urlpatterns = [
    path('docs/', swagger_schema.with_ui(
        'swagger', cache_timeout=0)),
    re_path(r'posts/', include(posts_router.urls)),
    re_path(r'users/', include(users_router.urls)),
    re_path(r'post_uploads/', include(posts_uploads_router.urls)),
    re_path(r'bookmarks/', include(bookmark_router.urls)),
    re_path(r'my_posts/', include(bookmark_router.urls)),
    re_path(r'bookmark/<int:user_id>/<int:post_id>/', include(post_bookmarked_router.urls)),
]
