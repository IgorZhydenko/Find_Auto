from django.contrib import admin
from api.models import User, Vehicle, PostSearch, PostFound
# Register your models here.

admin.site.register(User)
admin.site.register(Vehicle)
admin.site.register(PostSearch)
admin.site.register(PostFound)