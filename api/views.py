from allauth.account.models import EmailConfirmationHMAC
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy
from rest_framework import viewsets, permissions, mixins, status
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from api.models import User, Post, LostStatus, Bookmark, Comment, PostUploads
from api.serializers import UserSerializer, PostSerializer, BookmarkSerializer, LostStatusSerializer, CommentSerializer, PostUploadsSerializer
import datetime
import os
from rest_framework.viewsets import ModelViewSet, ViewSet
from django.db.models.functions import TruncDate
from rest_framework.response import Response
from django.db.models import Max, Sum, Avg, Q
from api import models
from api import serializers
from django.views import View
from django.http import HttpResponse
from os import system
from json import dumps


class BackupView(View):
    def post(self, request, *args, **kwargs):
        system('py manage.py dbbackup')
        return HttpResponse(status=200)


class RestoreDbView(View):
    def post(self, request, *args, **kwargs):
        system('echo Yes | python manage.py dbrestore')
        return HttpResponse(status=200)


def confirm_email(request, key):
    email_confirmation = EmailConfirmationHMAC.from_key(key)
    if email_confirmation:
        email_confirmation.confirm(request)
    return HttpResponseRedirect(reverse_lazy('api'))


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


class LostStatusView(mixins.ListModelMixin,
                      mixins.CreateModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin,
                      viewsets.GenericViewSet):
    queryset = LostStatus.objects.all()
    serializer_class = LostStatusSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class UserPostView(ModelViewSet):
    serializer_class = serializers.PostSerializer

    def get_queryset(self, *args, **kwargs):
        return models.Post.objects.filter(user=self.request.user)


class CommentView(mixins.ListModelMixin,mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class BookmarkView(mixins.ListModelMixin,mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def get(self, request, *args, **kwargs):
        user_id = request.data.user_id
        bookmarks = Bookmark.objects.filter(user_id=user_id)
        return HttpResponse(bookmarks)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

        # return self.list(request, *args, **kwargs)
        # post_id = request.data.post_id
        # is_post_bookmarked = Bookmark.objects.filter(user_id=user_id, post_id=post_id)