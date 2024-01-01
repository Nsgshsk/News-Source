from django.urls import path
from feeds import views

urlpatterns = [
    path('api/feeds', views.feeds_list),
    path('api/feeds/<int:id>', views.feed_details),
]
