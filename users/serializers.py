from rest_framework import serializers
from .models import User, Profile

    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['password', 'email','username' ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        return user

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user', 'date_of_birth', 'photo', ]