from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = None 
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f'User Profile for {self.email}'


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=50, unique=True)
    date_of_birth = models.DateField()
    photo = models.ImageField(upload_to='media/users/%Y/%m/%d', blank=True)


    def __str__(self):
        return f'Profile for user {self.username}'