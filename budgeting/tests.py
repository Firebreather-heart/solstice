from django.test import TestCase
from users.models import User,Profile 
from .models import Budget, Expense, Transaction
from datetime import datetime 
from django.urls import reverse 
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
import logging 
# Create your tests here.

logger = logging.getLogger(__name__)

class BudgetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            username="lexy", email = "test@mail.com", password = "alexpinky"
        )
        self.profile = Profile.objects.create(
            user = self.user, date_of_birth = datetime.now()
        )
        self.budget = Budget.objects.create(
            user = self.user, name="test budget", description = "a budget for the test case",amount=10000, 
        )
        self.token = Token.objects.create(user = self.user)
    
    def test_budget_api_view(self):
        self.client.force_authenticate(user=self.user, token=self.token)
        res =  self.client.get(reverse("show_budgets"))
        self.assertEqual(res.status_code, 200)
        logger.info(res.data)
        self.assertIn(self.budget.name, [budget['name'] for budget in res.data])

