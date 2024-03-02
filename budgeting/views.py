from django.shortcuts import render
from drf_yasg.utils import swagger_auto_schema 
from .models import Budget, Expense , Transaction
from .serializers import BudgetSerializer, ExpenseSerializer,TransactionSerializer
from rest_framework.generics import ListAPIView, CreateAPIView,UpdateAPIView,DestroyAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
# Create your views here.


class BudgetAPIView(ListAPIView):
    serializer_class = BudgetSerializer 
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Budget.objects.filter(user=user)


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

class BudgetDetailAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BudgetSerializer

    def get_queryset(self):
        user = self.request.user
        return Budget.objects.filter(user=user)

class CreateBudgetAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BudgetSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UpdateBudgetApiView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BudgetSerializer

    def get_queryset(self):
        user = self.request.user
        return Budget.objects.filter(user=user)
    
class DestroyBudgetApiView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BudgetSerializer

    def get_queryset(self):
        user = self.request.user
        return Budget.objects.filter(user=user)



class ExpenseAPIView(ListAPIView):
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
    
    def get_queryset(self):
        user = self.request.user
        return Expense.objects.filter(user=user)
    
class ExpenseDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        user = self.request.user
        return Expense.objects.filter(user=user)

class CreateExpenseAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ExpenseSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UpdateExpenseApiView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        user = self.request.user
        return Expense.objects.filter(user=user)

class DestroyExpenseApiView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        user = self.request.user
        return Expense.objects.filter(user=user)

class TransactionAPIView(ListAPIView):
    serializer_class = TransactionSerializer 
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(user=user)

    @swagger_auto_schema(
        responses={200: "OK"},
        operation_summary = "Get all the transactions for this user",
        operation_description = """
            This endpoint gives the list of the transactions the user has created.
""",
        security = [{"BearerAuth": []}]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

class TransactionDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TransactionSerializer

    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(user=user)

class CreateTransactionAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TransactionSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UpdateTransactionApiView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TransactionSerializer

    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(user=user)
    
class DestroyTransactionApiView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TransactionSerializer

    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(user=user)