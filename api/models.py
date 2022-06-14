from django.db import models
from django.contrib.auth.models import AbstractUser, Permission
from django.utils import timezone
#from PIL import Image
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    is_admin = models.BooleanField(default=False)
    about = models.CharField('О себе', max_length=1023, null=True, blank=True, default='')


class Post(models.Model):
    name = models.CharField(max_length=500)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    info = models.TextField(max_length=500, null=True, blank=True)
    is_search = models.BooleanField(default=True)
    registration_number = models.CharField(max_length=30, null=True, blank=True)
    vin_code = models.CharField(max_length=30, null=True, blank=True)
    brand = models.CharField(max_length=30, null=True, blank=True)
    model = models.CharField(max_length=30, null=True, blank=True)
    year = models.DateField('Date created', default=timezone.now, null=True, blank=True)
    color = models.CharField(max_length=50, null=True, blank=True)
    distinct_feature = models.TextField(null=True, blank=True)
    vehicle_seen_place = models.TextField(max_length=500, null=True, blank=True)
    vehicle_seen_date = models.DateField('Date seen', default=timezone.now, null=True, blank=True)
    created = models.DateTimeField('Date created', default=timezone.now)
    closed = models.DateTimeField('Date closed', default=None, null=True, blank=True)
    is_active = models.BooleanField(default=True)


class Comment(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE)
    name = models.CharField(max_length=500)
    email = models.EmailField(max_length=254)
    body = models.TextField(null=True)
    created = models.DateTimeField('Date created', default=timezone.now)
    is_active = models.BooleanField(default=True)


class LostStatus(models.Model):
    post_search_id = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_search')
    post_found_id = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_found')
    status = models.TextField(null=True)


class Bookmark(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE)


class PostUploads(models.Model):
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="post/", max_length=250, default=None)
