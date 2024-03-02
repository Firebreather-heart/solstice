from django.test import TestCase
from django.urls import reverse 
from django.contrib.auth import get_user_model 
from .models import Profile 
import datetime
# Create your tests here.


class ProfileTestCase(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(
            username="lexy", email = "test@mail.com", password = "alexpinky"
        )
        self.profile = Profile.objects.create(
            user = self.user, date_of_birth = datetime.datetime.now()
        )
    
    def test_profile(self):
        self.client.login(
            username = 'lexy', email = 'test@mail.com', password = 'alexpinky'
        )
        res = self.client.get(reverse('profile'))
        self.assertEqual(self.profile.user.username, "lexy")
        
    

    
    