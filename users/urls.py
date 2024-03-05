from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from django.urls import path
from .views import ProfileView
from allauth.account.views import ConfirmEmailView,PasswordChangeView,PasswordResetDoneView,PasswordResetFromKeyDoneView,PasswordResetFromKeyView,PasswordResetView,EmailVerificationSentView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="rest_register"),
    path("login/", LoginView.as_view(), name="rest_login"),
    path("logout/", LogoutView.as_view(), name="rest_logout"),
    path("user/", UserDetailsView.as_view(), name="rest_user_details"),
    path('profile/', ProfileView.as_view(), name='profile'),

    path('confirm_email', ConfirmEmailView.as_view(), name='rest_confirm_email'),
    path('password_change', PasswordChangeView.as_view(), name='rest_password_change'),
    path('password_reset', PasswordResetView.as_view(), name='rest_password_reset'),
    path('password_reset_done', PasswordResetDoneView.as_view(), name='rest_password_reset_done'),
    path('password_reset_from_key', PasswordResetFromKeyView.as_view(), name='rest_password_reset_from_key'),
    path('password_reset_from_key_done', PasswordResetFromKeyDoneView.as_view(), name='rest_password_reset_from_key_done'),
    path('email_verification_sent', EmailVerificationSentView.as_view(), name='rest_email_verification_sent'),
    
]
