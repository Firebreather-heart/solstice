from django.urls import path
from .views import BudgetAPIView, ExpenseAPIView,CreateBudgetAPIView,CreateExpenseAPIView, UpdateBudgetApiView,UpdateExpenseApiView,DestroyBudgetApiView,DestroyExpenseApiView

urlpatterns = [
    path('budgets/', BudgetAPIView.as_view(), name='show_budgets' ),
    path('create_budget/', CreateBudgetAPIView.as_view(), name='create_budget' ),
    path('update_budget/', UpdateBudgetApiView.as_view(), name='update_budget' ),
    path('delete_budget/', DestroyBudgetApiView.as_view(), name='delete_budget' ),
    
    path('expenses/', ExpenseAPIView.as_view(), name='show_budgets' ),
    path('create_expense/', CreateExpenseAPIView.as_view(), name='create_expense' ),
    path('update_expense/', UpdateExpenseApiView.as_view(), name='update_expense' ),
    path('delete_expense/', DestroyExpenseApiView.as_view(), name='delete_expense' ),
]