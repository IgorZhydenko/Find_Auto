from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenVerifyView,
    TokenRefreshView,
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
"""
schema_view = get_swagger_view(title='Collections API')

urlpatterns = [
    url(r'^$', schema_view, name='api'),
    path('admin/', admin.site.urls),
    re_path(r'rest-auth/', include('api.auth_urls')),
    re_path(r'^', include('api.urls')),

]
"""
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['is_admin'] = user.is_admin

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


urlpatterns = [
    path('admin/', admin.site.urls),
    path('find_auto/', include('api.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/token/login/', MyTokenObtainPairView.as_view()),
    path('auth/token/refresh/', TokenRefreshView.as_view()),
    path('auth/token/verify/', TokenVerifyView.as_view()),
]

# urlpatterns = [
#     path('admin/', admin.site.urls),
#
#     # path to djoser end points
#     url(r'^auth/', include('djoser.urls')),
#     url(r'^auth/', include('djoser.urls.jwt')),
# ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)