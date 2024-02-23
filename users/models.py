from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return f'User Profile for {self.email}'


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=50, unique=True)
    date_of_birth = models.DateField()
    photo = models.ImageField(upload_to='media/users/%Y/%m/%d', blank=True)
    BUDGET_SCHEMES = (
        ('ZBB', 'Zero Based Budgeting'),
        ('EAB', 'Envelope Accounting Budgeting'),
        ('50/30/20', '50/30/20 Budgeting'),
        ('PYF', 'Pay Yourself First Budgeting'),
        ('PBB', 'Percentage Based Budgeting'),
        ('PBB', 'Priority Based Budgeting'),
    )
    budget_scheme = models.CharField(max_length=30, choices=BUDGET_SCHEMES, default='ZBB') 

    def __str__(self):
        return f'Profile for user {self.username}'