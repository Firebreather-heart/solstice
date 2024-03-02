from django.shortcuts import render, redirect
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import ProfileSerializer
from drf_yasg.utils import swagger_auto_schema
from .models import Profile

# Create your views here.


    
# class CreateProfile(CreateAPIView):
#     permission_classes = [IsAuthenticated]
#     serializer_class = ProfileSerializer
#     queryset = Profile.objects.all()

# class UpdateProfile(UpdateAPIView):
#     permission_classes = [IsAuthenticated]
#     serializer_class = ProfileSerializer
#     queryset = Profile.objects.all()

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    @swagger_auto_schema(
        request_body=ProfileSerializer,
        responses={201: 'Profile created successfully', 400: 'Invalid data provided'}
    )
    def post(self, request):
        serializer = ProfileSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        request_body=ProfileSerializer,
        responses={201: 'Profile updated successfully', 400: 'Invalid data provided'}
    )
    def put(self, request):
        profile = Profile.objects.get(user = request.user)
        serializer = ProfileSerializer(profile, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        responses={200: 'Profile retrieved successfully'}
    )
    def get(self, request):
        profile = Profile.objects.get(user = request.user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status = status.HTTP_200_OK)