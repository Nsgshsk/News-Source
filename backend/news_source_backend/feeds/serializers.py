from rest_framework import serializers
from feeds.models import Feed, FeedItem

class FeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feed
        fields = ('id',
                  'source_name',
                  'source_image',
                  'source_description',
                  'source_url',)
        
class FeedItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedItem
        fields = ('item_title',
                  'item_category',
                  'item_url',
                  'image_source',
                  'summary',
                  'published')