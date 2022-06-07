from django.contrib import admin
from api.models import User, Post, LostStatus, Comment, PostUploads
# Register your models here.

admin.site.register(User)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(PostUploads)
admin.site.register(LostStatus)