from django.test import TestCase
from users.models import User,Profile 
from .models import Budget, Expense, Transaction
from datetime import datetime 
from django.urls import reverse 
from django.contrib.auth import get_user_model
# Create your tests here.


class BudgetTestCase(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="lexy", email = "test@mail.com", password = "alexpinky"
        )
        self.profile = Profile.objects.create(
            user = self.user, date_of_birth = datetime.now()
        )
        self.budget = Budget.objects.create(
            user = self.user, name="test budget", description = "a budget for the test case",amount=10000, 
        )
    
    def test_budget_api_view(self):
        self.client.login(
            username = 'lexy',
            email= 'test@mail.com', password = "alexpinky",
        )
        self.assertTrue(self.user.is_authenticated)
        res =  self.client.get(reverse("show_budgets"))
        self.assertEqual(res.status_code, 200)
        self.assertContains(res, "test budget")

