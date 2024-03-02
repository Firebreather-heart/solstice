from django.urls import path
from .views import BudgetAPIView, ExpenseAPIView,CreateBudgetAPIView,CreateExpenseAPIView, UpdateBudgetApiView,UpdateExpenseApiView,DestroyBudgetApiView,DestroyExpenseApiView, BudgetDetailAPIView,ExpenseDetailView,TransactionAPIView,CreateTransactionAPIView,UpdateTransactionApiView,DestroyTransactionApiView

urlpatterns = [
    path('budgets/', BudgetAPIView.as_view(), name='show_budgets' ),
    path('budget_detail/', BudgetDetailAPIView.as_view(), name='budget_detail'),
    path('create_budget/', CreateBudgetAPIView.as_view(), name='create_budget' ),
    path('update_budget/', UpdateBudgetApiView.as_view(), name='update_budget' ),
    path('delete_budget/', DestroyBudgetApiView.as_view(), name='delete_budget' ),
    
    path('expenses/', ExpenseAPIView.as_view(), name='show_budgets' ),
    path('expense_detail/', ExpenseDetailView.as_view(), name='expense_detail'),
    path('create_expense/', CreateExpenseAPIView.as_view(), name='create_expense' ),
    path('update_expense/', UpdateExpenseApiView.as_view(), name='update_expense' ),
    path('delete_expense/', DestroyExpenseApiView.as_view(), name='delete_expense' ),

    path('transactions/', TransactionAPIView.as_view(), name='show_transactions' ),
    path('transaction_detail/', TransactionAPIView.as_view(), name='transaction_detail'),
    path('create_transaction/', CreateTransactionAPIView.as_view(), name='create_transaction' ),
    path('update_transaction/', UpdateTransactionApiView.as_view(), name='update_transaction' ),
    path('delete_transaction/', DestroyTransactionApiView.as_view(), name='delete_transaction' ),

]