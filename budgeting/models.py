from django.contrib.auth import get_user_model
from django.db import models
# Create your models here.

class Budget(models.Model):
    user = models.ForeignKey(get_user_model(), related_name='budget', on_delete = models.CASCADE)
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
    user = models.ForeignKey(get_user_model(), related_name='expenses', on_delete = models.CASCADE)
    name = models.CharField(max_length = 100)
    description = models.TextField()
    budget = models.ForeignKey(Budget, related_name='expenses', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    amount = models.DecimalField(max_digits = 10, decimal_places = 2)
    spent = models.DecimalField(max_digits = 10, decimal_places = 2, default=0)
    balance = models.IntegerField()


    def save(self, *args, **kwargs):
        if self.budget.amount_left < self.amount:
            raise ValueError('Expense exceeds budget balance')
        self.balance =self.amount - self.spent #allows for going over budgeted expense, hence debt
        return super().save(*args, **kwargs)
    
    def spend(self, amount):
        self.spent += amount 
        self.save()

    def __str__(self):
        return f"{self.name} Expense, cost:{self.amount} {self.budget.currency}"
    
    
class Transaction(models.Model):
    user = models.ForeignKey(get_user_model(), related_name='transactions', on_delete = models.CASCADE)
    expense = models.ForeignKey(Expense, related_name='transactions', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(max_digits = 10, decimal_places = 2)
    description = models.TextField()

    def __str__(self):
        return f"Transaction - desc:{self.description} on {self.created}"
    
    def save(self, *args, **kwargs):
        self.expense.spend(self.amount)
        return super().save(*args, **kwargs)