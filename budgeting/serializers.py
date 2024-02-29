from .models import Budget, Expense 
from rest_framework import serializers 

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget 
        fields = ['name', 'created', 'updated', 'description', 'amount', 'amount_left', 'currency', 'budget_type']
    
    def create(self,validated_data):
        budget = Budget.objects.create(**validated_data)
        return budget
    
class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense 
        fields = ['name', 'created', 'updated', 'description', 'amount', 'budget']

    def create(self, validated_data):
        budget = Expense.objects.create(**validated_data)
