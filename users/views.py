from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from drf_yasg.utils import swagger_auto_schema
from django.contrib.auth import authenticate,login
from rest_framework.authtoken.models import Token

# Create your views here.


class UserRegistrationAPIView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(request_body=UserSerializer,
                         responses={201: 'User created successfully', 400: 'Invalid data provided'})
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(request_body=UserSerializer,
                         responses={201: 'User logged in successfully', 400: 'Invalid data provided'})
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)

        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid Credentials'},status=status.HTTP_401_UNAUTHORIZED)