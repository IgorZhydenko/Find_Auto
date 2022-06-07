from rest_framework import serializers

from api.models import User, Post, LostStatus, Comment, PostUploads


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'about')
        #read_only_fields = ('email',)


class PostUploadsSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostUploads
        fields = 'post_id', 'image'


class PostSerializer(serializers.ModelSerializer):
    #user = UserSerializer(read_only=True)
    #uploads = PostUploadsSerializer(read_only=True, many=True)
    #images = serializers.ImageField(required=False)
    #images = PostUploadsSerializer(many=True)

    class Meta:
        model = Post
        fields = ('name', 'user_id', 'info', 'is_search', 'vin_code', 'brand', 'model',
                  'year', 'color', 'distinct_feature', 'vehicle_seen_place', 'vehicle_seen_date',
                  'created', 'closed', 'is_active') #'images'
#
# class PostFileSerializer(serializers.ModelSerializer):
#     images = PostUploadsSerializer(many=True)
#
#     class Meta:
#         model = Post
#         fields = ('name', 'user_id', 'info', 'is_search', 'vin_code', 'brand', 'model',
#                   'year', 'color', 'distinct_feature', 'vehicle_seen_place', 'vehicle_seen_date',
#                   'created', 'closed', 'is_active', 'images')
# #
#
# class PostFilesSerializer(serializers.ModelSerializer):
#     # user = UserSerializer(read_only=True)
#     # uploads = PostUploadsSerializer(read_only=True, many=True)
#     # uploads = serializers.ImageField(required=False)
#     images = PostUploadsSerializer(many=True)
#
#     class Meta:
#         model = Post
#         fields = ('name', 'user_id', 'info', 'is_search', 'vin_code', 'brand', 'model',
#                   'year', 'color', 'distinct_feature', 'vehicle_seen_place', 'vehicle_seen_date',
#                   'created', 'closed', 'is_active', 'images')

    # def create(self, validated_data):
    #     uploads_data = validated_data.pop('uploads')
    #     post = Post.objects.create(**validated_data)
    #     for uploads_data in uploads_data:
    #         PostUploads.objects.create(post_id=post.id, **uploads_data)
    #     return post


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post = PostSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'


class LostStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = LostStatus
        fields = '__all__'


"""
#fields = ('user_id', 'post_id', 'name', 'email', 'body', 'created', 'is_active')
 #fields = ('name', 'user_id', 'vehicle_id', 'info', 'files', 'vehicle_seen_place', 'vehicle_seen_date', 'created', 'closed', 'is_active')
        #read_only_fields = 'created'
        fields = '__all__'
        
        fields = ('name', 'user_id', 'info', 'status_search', 'vin_code', 'brand', 'model',
                  'year', 'color', 'distinct_feature', 'vehicle_seen_place', 'vehicle_seen_date',
                  'created', 'closed', 'is_active', 'uploads')
"""