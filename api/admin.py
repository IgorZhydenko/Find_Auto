from django.contrib import admin
from api.models import User, Post, Bookmark, PostUploads

admin.site.register(User)
admin.site.register(Post)
admin.site.register(PostUploads)
admin.site.register(Bookmark)
