from allauth.account.models import EmailConfirmationHMAC
from coreschema import Integer
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy
from rest_framework import viewsets, permissions, mixins, status
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from api.models import User, Post, Bookmark, PostUploads
from api.serializers import UserSerializer, PostSerializer, BookmarkSerializer, PostUploadsSerializer
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


"""
class UsersView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class PostView(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get(self, request, *args, **kwargs):
        name = request.data.name
        info = request.data.info
        is_search = request.data.isSearch
        vehicle_seen_date = request.data.vehicleSeenDate
        vehicle_seen_place = request.data.vehicleSeenPlace
        registration_number = request.data.registrationNumber
        vin_code = request.data.vinCode
        brand = request.data.brand
        model = request.data.model
        year = request.data.year
        color = request.data.color
        posts = Post.objects.filter(name=name, info=info, is_search=is_search, registration_number=registration_number,
                                    vin_code=vin_code, brand=brand, model=model, year=year, color=color,
                                    vehicle_seen_place=vehicle_seen_place, vehicle_seen_date=vehicle_seen_date)
        serializer = BookmarkSerializer(posts, many=True)
        return Response(serializer.data)
        # return self.list(request, *args, **kwargs)


class PostUploadsView(ModelViewSet):
    queryset = PostUploads.objects.all()
    serializer_class = PostUploadsSerializer


class UserPostView(ModelViewSet):
    serializer_class = serializers.PostSerializer

    def get_queryset(self, *args, **kwargs):
        return models.Post.objects.filter(user=self.request.user)


class BookmarkView(ModelViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

    def get(self, request, *args, **kwargs):
        user_id = request.data.user_id
        bookmarks = Bookmark.objects.filter(user_id=user_id)
        serializer = BookmarkSerializer(bookmarks, many=True)
        return Response(serializer.data)
        #return HttpResponse(bookmarks)

"""
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
        name = request.data.name
        info = request.data.info
        is_search = request.data.isSearch
        vehicle_seen_date = request.data.vehicleSeenDate
        vehicle_seen_place = request.data.vehicleSeenPlace
        registration_number = request.data.registrationNumber
        vin_code = request.data.vinCode
        brand = request.data.brand
        model = request.data.model
        year = request.data.year
        color = request.data.color
        posts = Post.objects.filter(name=name, info=info, is_search=is_search, registration_number=registration_number,
                                    vin_code=vin_code, brand=brand, model=model, year=year, color=color,
                                    vehicle_seen_place=vehicle_seen_place, vehicle_seen_date=vehicle_seen_date)
        serializer = BookmarkSerializer(posts, many=True)
        return Response(serializer.data)
        # return self.list(request, *args, **kwargs)

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

    # 'name', 'info', 'is_search', 'registration_number', 'vin_code', 'brand', 'model',
    # 'year', 'color', 'distinct_feature', 'vehicle_seen_place', 'vehicle_seen_date',
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class UserPostView(ModelViewSet):
    serializer_class = serializers.PostSerializer

    def get_queryset(self, *args, **kwargs):
        return models.Post.objects.filter(user=self.request.user)


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
    http_method_names = ['get', 'retrieve']

    def retrieve(self, request, *args, **kwargs):
        user_id = request.build_absolute_uri().split("/")[5]
        post_id = request.build_absolute_uri().split("/")[6]
        bookmarks = Bookmark.objects.filter(user_id=user_id, post_id=post_id)
        serializer = BookmarkSerializer(bookmarks, many=True)
        return Response(serializer.data)


# post_id = request.build_absolute_uri().split("/")[6]
#         # try {
#         #     Integer.parseInt(s);
#         # return true;
#         # } catch(NumberFormatException
#         # e) {
#         # return false;
#         # }
#         try:
#             if(post_id.isdigit()):
#                 # bookmarks = Bookmark.objects.filter(user_id=user_id)
#                 instance = Bookmark.objects.get(user_id=user_id, post_id=post_id)
#         except: Bookmark.DoesNotExist:
#                 return Response(False)
# return self.list(request, *args, **kwargs)
# post_id = request.data.post_id
# is_post_bookmarked = Bookmark.objects.filter(user_id=user_id, post_id=post_id)

# user_id = request.data.user_id
# post_id = request.data.post_id
# Bookmark.objects.filter(user_id=user_id, post_id=post_id).delete()

# user_id = request.data.user_id
# post_id = request.data.post_id
#
# bookmarks = Bookmark.objects.filter(user_id=user_id)
# post_bookmark = Bookmark.objects.filter(user_id=user_id, post_id=post_id)
#
# if post_bookmark.exists():
#     serializer = BookmarkSerializer(post_bookmark)
#     return Response(serializer.data)
# else:
#     serializer = BookmarkSerializer(bookmarks, many=True)
#     return Response(serializer.data)

# name = request.data.name
# info = request.data.info
# is_search = request.data.isSearch
# vehicle_seen_date = request.data.vehicleSeenDate
# vehicle_seen_place = request.data.vehicleSeenPlace
# registration_number = request.data.registrationNumber
# vin_code = request.data.vinCode
# brand = request.data.brand
# model = request.data.model
# year = request.data.year
# color = request.data.color
# posts = Post.objects.filter(name=name, info=info, is_search=is_search, registration_number=registration_number,
#                             vin_code=vin_code, brand=brand, model=model, year=year, color=color,
#                             vehicle_seen_place=vehicle_seen_place, vehicle_seen_date=vehicle_seen_date)
# return HttpResponse(posts)