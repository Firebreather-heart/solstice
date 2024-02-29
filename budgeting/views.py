from django.shortcuts import render
from drf_yasg.utils import swagger_auto_schema 
from .models import Budget, Expense 
from .serializers import BudgetSerializer, ExpenseSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView,UpdateAPIView,DestroyAPIView
from rest_framework.permissions import IsAuthenticated
# Create your views here.


class BudgetAPIView(ListAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer 
    permission_classes = [IsAuthenticated]


    @swagger_auto_schema(
        responses={200: "OK"},
        operation_summary = "Get all the budgets for this user",
        operation_description = """
            This endpoint gives the list of the budgets the user has created.
""",
        security = [{"BearerAuth": []}]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class CreateBudgetAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

class UpdateBudgetApiView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

class DestroyBudgetApiView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer



class ExpenseAPIView(ListAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer 
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        responses={200: "OK"},
        operation_summary = "Get all the budgets for this user",
        operation_description = """
            This endpoint gives the list of the budgets the user has created.
""",
        security = [{"BearerAuth": []}]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    

class CreateExpenseAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class UpdateExpenseApiView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class DestroyExpenseApiView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
