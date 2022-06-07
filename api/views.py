from allauth.account.models import EmailConfirmationHMAC
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy
from rest_framework import viewsets, permissions, mixins, status
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from api.models import User, Post, LostStatus, Comment, PostUploads
from api.serializers import UserSerializer, PostSerializer, LostStatusSerializer, CommentSerializer, PostUploadsSerializer


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
    http_method_names = ['get', 'post', 'put', 'delete']

    def get(self, request, *args, **kwargs):
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
        return self.list(request, *args, **kwargs)
        # serializer = PostSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # self.perform_create(serializer)
        #
        # image = request.data.get("images[]")
        # upload_image = PostUploads(image=image, post_id=serializer.instance.pk)
        # upload_image.save()
        # return HttpResponse(status=200)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
#
# class PostFileView(mixins.ListModelMixin, mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
#                mixins.DestroyModelMixin, viewsets.GenericViewSet):
#     queryset = Post.objects.all()
#     serializer_class = PostFileSerializer
#     http_method_names = ['create', 'get', 'post', 'put', 'delete']
#
#     def create(self, request, *args, **kwargs):
#         serializer = PostFileSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#
#         image = request.data.get("images[]")
#         upload_image = PostUploads(image=image, post_id=serializer.instance.pk)
#         upload_image.save()
#         #request.data.images = image
#
#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)
#
#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)
#
#     def delete(self, request, *args, **kwargs):
#         return self.destroy(request, *args, **kwargs)
#


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


"""
    def get(self, request, *args, **kwargs):
        #return self.list(request, *args, **kwargs)
        info = list(models.Post.objects.all().values_list(
            'id', 'name', 'user_id', 'vehicle_id',
            'info', 'vehicle_seen_place', 'vehicle_seen_date', 'created', 'closed', 'is_active'
        ))
        #result_dict = self.serialize(info)
        return HttpResponse(info, status=200)
        """
"""
mixins.ListModelMixin, mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                mixins.DestroyModelMixin, viewsets.GenericViewSet

class MyPostView(mixins.ListModelMixin, mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
               mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def retrieve(self, request, pk=None):
        queryset = models.RationProduct.objects.filter(ration=self.kwargs.get('pk'))
        serialized_data = self.serialize(list(queryset))
        return Response(serialized_data)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
"""

class UpdateCertificate(View):

    def post(self, request, *args, **kwargs):
        return execute_command(
            'mkcert cert key 0.0.0.0 localhost 127.0.0.1 ::1 && mv '
            'cert+5.pem cert.pem && mv cert+5-key.pem key.pem')


def execute_command(command):
    os.system(command)
    return HttpResponse(status=200)


"""
class PostFoundViewSet(mixins.ListModelMixin,
                           mixins.CreateModelMixin,
                           mixins.RetrieveModelMixin,
                           mixins.UpdateModelMixin,
                           mixins.DestroyModelMixin,
                           viewsets.GenericViewSet):

    queryset = PostFound.objects.all()
    serializer_class = PostFoundSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

"""
# class WorksViewSet(viewsets.ViewSet):
#     queryset = Work.objects.prefetch_related('contributors').all()
#     lookup_field = 'iswc'
#
#     def retrieve(self, request, iswc=None):
#         work = get_object_or_404(self.queryset, iswc=iswc)
#         serializer = WorkSerializer(work)
#         return Response(serializer.data)