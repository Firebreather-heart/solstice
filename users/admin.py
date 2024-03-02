from django.contrib import admin
from .models import User,Profile
# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email','is_active','is_staff','is_superuser']
    list_filter = ['is_active','is_staff','is_superuser']
