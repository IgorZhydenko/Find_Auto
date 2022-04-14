from django.contrib import admin
from django.urls import path
from django.contrib import admin
from django.conf.urls import url, include
from django.urls import include, path, re_path
from rest_framework_swagger.views import get_swagger_view

from api.urls import vehicle_router, postSearchViewSet_router, postFoundViewSet_router, users_router

schema_view = get_swagger_view(title='Collections API')

urlpatterns = [
    url(r'^$', schema_view, name='api'),
    path('admin/', admin.site.urls),
    re_path(r'rest-auth/', include('api.auth_urls')),
    re_path(r'^', include('api.urls')),

]