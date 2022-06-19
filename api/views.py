from rest_framework import mixins
from rest_framework import viewsets
from api.models import User, Post, Bookmark, PostUploads
from api.serializers import UserSerializer, PostSerializer, BookmarkSerializer, PostUploadsSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from api import models


class UsersView(mixins.ListModelMixin,
                      mixins.CreateModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin,
                      viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    swagger_schema = None
    http_method_names = ['get', 'post', 'put', 'delete']

    def get(self, request, *args, **kwargs):
        self.request.session.set_expiry(0)
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class PostView(mixins.ListModelMixin, mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
               mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class PostUploadsView(mixins.ListModelMixin, mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = PostUploads.objects.all()
    serializer_class = PostUploadsSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class UserPostView(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self, *args, **kwargs):
        return models.Post.objects.filter(user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        user_id = request.build_absolute_uri().split("/")[5]
        posts = Post.objects.filter(user_id=user_id)
        serializer = BookmarkSerializer(posts, many=True)
        return Response(serializer.data)


class BookmarkView(mixins.ListModelMixin,mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    http_method_names = ['get', 'retrieve', 'post', 'put', 'delete']

    def retrieve(self, request, *args, **kwargs):
        user_id = request.build_absolute_uri().split("/")[5]
        bookmarks = Bookmark.objects.filter(user_id=user_id)
        serializer = BookmarkSerializer(bookmarks, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class PostBookmarkedView(mixins.ListModelMixin,mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    http_method_names = ['get']

    def retrieve(self, request, *args, **kwargs):
        user_id = request.build_absolute_uri().split("/")[5]
        post_id = request.build_absolute_uri().split("/")[6]
        bookmarks = Bookmark.objects.filter(user_id=user_id, post_id=post_id)
        serializer = BookmarkSerializer(bookmarks, many=True)
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        user_id = request.build_absolute_uri().split("/")[5]
        post_id = request.build_absolute_uri().split("/")[6]
        bookmarks = Bookmark.objects.filter(user_id=user_id, post_id=post_id)
        serializer = BookmarkSerializer(bookmarks, many=True)
        return Response(serializer.data)
