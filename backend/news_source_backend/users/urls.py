from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from users.views import RegisterUser, LogInUser

urlpatterns = [
    path('', LogInUser.as_view()),
    path('register/', RegisterUser.as_view()),
    path('settings/', ),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]