from rest_framework import serializers

from api.models import User, Vehicle, PostSearch, PostFound


class UserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'about')
        read_only_fields = ('email',)


class VehicleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vehicle
        fields = ('vehicleMark', 'vehicleModel', 'vehicleSearching',
                  'vehicleFound')


class PostSearchSerializer(serializers.ModelSerializer):
    user = UserDetailsSerializer(read_only=True)
    sections = VehicleSerializer(read_only=True)

    class Meta:
        model = PostSearch
        fields = ('user', 'sections', 'date_started')
        read_only_fields = 'postCreated'


class PostFoundSerializer(serializers.ModelSerializer):
    user = UserDetailsSerializer(read_only=True)
    sections = VehicleSerializer(read_only=True)

    class Meta:
        model = PostFound
        fields = ('user', 'sections', 'date_started')
        read_only_fields = 'postCreated'
