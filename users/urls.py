from django.urls import path 
from .views import UserRegistrationAPIView, LoginAPIView

urlpatterns = [
    path('register/', UserRegistrationAPIView.as_view(), name='register_user'),
    path('login/', LoginAPIView.as_view(), name='login_user'),
]