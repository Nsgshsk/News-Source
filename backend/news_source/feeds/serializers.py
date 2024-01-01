from rest_framework import serializers
from feeds.models import Feed

class FeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feed
        fields = ('id',
                  'source_name',
                  'source_url',
                  'category',
                  'last_update',
                  'feed_information')