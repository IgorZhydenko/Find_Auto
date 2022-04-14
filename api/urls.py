from django.urls import include
from django.conf.urls import url, include
from django.urls import path, re_path
from rest_framework.routers import DefaultRouter
from api.views import VehicleViewSet, PostSearchViewSet, PostFoundViewSet, UsersItemViewSet

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
