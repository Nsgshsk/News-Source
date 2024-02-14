from django.contrib import admin
from django.urls import path, include

from feeds.views import FeedList, FeedItemsList, UserFeedList, UserFeedItemsList

urlpatterns = [
    path('', UserFeedList.as_view()),
    path('items/', UserFeedItemsList.as_view()),
    path('<int:id>/', FeedItemsList.as_view()),
    path('allfeeds/', FeedList.as_view())
]