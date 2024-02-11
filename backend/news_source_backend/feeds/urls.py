from django.contrib import admin
from django.urls import path, include

from news_source_backend import feeds

urlpatterns = [
    path('', feeds.views.all_feeds_list),
    path('items/', feeds.views.all_feed_items_list),
    path('<int:id>/', feeds.views.feed_info),
    path('<int:id>/items/', feeds.views.feed_items_list),
]