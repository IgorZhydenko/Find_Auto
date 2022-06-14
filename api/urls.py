"""
from django.urls import include
from django.conf.urls import url, include
from django.urls import path, re_path
from rest_framework.routers import DefaultRouter
from api.views import VehicleViewSet, PostSearchViewSet, PostFoundViewSet, UsersItemViewSet
"""
from django.urls import path
from rest_framework.routers import SimpleRouter
from api import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from api.views import PostView, UsersView, PostUploadsView, BookmarkView, CommentView, LostStatusView
from django.conf.urls import url
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

users_router = DefaultRouter()
users_router.register(r'', UsersView)

lost_status_router = DefaultRouter()
lost_status_router.register(r'', LostStatusView)

bookmark_router = DefaultRouter()
bookmark_router.register(r'', BookmarkView)

comment_router = DefaultRouter()
comment_router.register(r'', CommentView)

posts_uploads_router = DefaultRouter()
posts_uploads_router.register(r'', PostUploadsView, basename='posts')

urlpatterns = [
    path('docs/', swagger_schema.with_ui(
        'swagger', cache_timeout=0)),
    re_path(r'posts/', include(posts_router.urls)),
    re_path(r'users/', include(users_router.urls)),
    re_path(r'post_uploads/', include(posts_uploads_router.urls)),
    re_path(r'lost_status/', include(lost_status_router.urls)),
    re_path(r'bookmarks/', include(bookmark_router.urls)),
]
#re_path(r'similarity/', include(posts_router.urls)),
#urlpatterns += simple_router.urls

"""
vehicle_router = DefaultRouter()
vehicle_router.register(r'', VehicleViewSet, basename='section')

postSearchViewSet_router = DefaultRouter()
postSearchViewSet_router.register(r'', PostSearchViewSet)

postFoundViewSet_router = DefaultRouter()
postFoundViewSet_router.register(r'', PostFoundViewSet)

users_router = DefaultRouter()
users_router.register(r'', UsersItemViewSet)

urlpatterns = [
    re_path(r'vehicle/', include(vehicle_router.urls)),
    re_path(r'postSearch/', include(postSearchViewSet_router.urls)),
    re_path(r'postFound/', include(postFoundViewSet_router.urls)),
    re_path(r'users/', include(users_router.urls)),
]
"""