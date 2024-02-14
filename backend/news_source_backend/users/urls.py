from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView

from users.views import RegisterUser, ObtainTokenPair

urlpatterns = [
    path('register/', RegisterUser.as_view()),
    #path('settings/', ),
    path('token/', ObtainTokenPair.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist')
]