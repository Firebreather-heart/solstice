from django.db import models
from users.models import Profile
# Create your models here.

class Budget(models.Model):
    user = models.ForeignKey(Profile, related_name='budget', on_delete = models.CASCADE)
    name = models.CharField(max_length = 100)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    description = models.TextField()
    # BUDGET_SCHEMES = (
    #     ('ZBB', 'Zero Based Budgeting'),
    #     ('EAB', 'Envelope Accounting Budgeting'),
    #     ('50/30/20', '50/30/20 Budgeting'),
    #     ('PYF', 'Pay Yourself First Budgeting'),
    #     ('PBB', 'Percentage Based Budgeting'),
    #     ('PBB', 'Priority Based Budgeting'),
    # )
    # scheme = models.CharField(max_length = 100, choices = BUDGET_SCHEMES, default = 'ZBB')
    amount = models.DecimalField(max_digits = 10, decimal_places = 2)
    amount_left = models.DecimalField(max_digits = 10, decimal_places = 2)
    currency = models.CharField(max_length = 10, choices = (
        ('#', 'Naira'),
        ('$', 'Dollars')
    ), default = '#')
    budget_type = models.CharField(max_length=10, choices = (
        ('DL', 'Daily'),
        ('WK', 'Weekly'),
        ('MT', 'Monthly'),
        ('YR', 'yearly')
    ), default = 'WK')

    def save(self, *args, **kwargs):
        self.amount_left = self.amount 
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.created.isoformat(':')} {self.currency}{self.amount} Budget"

class Expense(models.Model):
    name = models.CharField(max_length = 100)
    description = models.TextField()
    budget = models.ForeignKey(Budget, related_name='expenses', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    amount = models.DecimalField(max_digits = 10, decimal_places = 2)

    def save(self, *args, **kwargs):
        if self.budget.amount_left < self.amount:
            raise ValueError('Expense exceeds budget balance')
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} Expense, cost:{self.amount} {self.budget.currency}"
    
    
