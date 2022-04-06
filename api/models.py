from django.db import models
from django.contrib.auth.models import AbstractUser, Permission
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    is_admin = models.BooleanField(default=False)
    about = models.CharField('О себе', max_length=1023, null=True, blank=True, default='')


class Vehicle(models.Model):
    vehicleId = models.AutoField(primary_key=True)
    vehicleMark = models.CharField(max_length=30)
    vehicleModel = models.CharField(max_length=30)
    vehicleSearching = models.BooleanField().default = False
    vehicleFound = models.BooleanField().default = False


class PostSearch(models.Model):
    postId = models.AutoField(primary_key=True)
    postName = models.CharField(max_length=500)
    postInfo = models.CharField(max_length=500)
    postVehicleId = models.ForeignKey(Vehicle, on_delete=models.CASCADE)


class PostFound(models.Model):
    postId = models.AutoField(primary_key=True)
    postName = models.CharField(max_length=500)
    postInfo = models.CharField(max_length=500)
    postVehicleId = models.ForeignKey(Vehicle, on_delete=models.CASCADE)


class UserNotification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vehicleId = models.ForeignKey(Vehicle, on_delete=models.CASCADE)