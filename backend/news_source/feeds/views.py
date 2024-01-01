from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from feeds.models import Feed
from feeds.serializers import FeedSerializer
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET', 'POST', 'DELETE'])
def feeds_list(request):
    if request.method == 'GET':
        feeds = Feed.objects.all()
        feed_serializer = FeedSerializer(feeds, many=True)
        return JsonResponse(feed_serializer.data, safe=False)
    elif request.method == 'POST':
        feed_data = JSONParser().parse(request)
        feed_serializer = FeedSerializer(data=feed_data)
        if feed_serializer.is_valid():
            feed_serializer.save()
            return JsonResponse(feed_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(feed_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        count = Feed.objects.all().delete()
        return JsonResponse({'message': 'All Feeds were deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def feed_details(request, id):
    feed = Feed.objects.get(pk=id)
    
    if request.method == 'GET':
        feed_serializer = FeedSerializer(feed)
        return JsonResponse(feed_serializer.data)
    elif request.method == 'PUT':
        feed_data = JSONParser().parse(request)
        feed_serializer = FeedSerializer(feed, data=feed_data)
        if feed_serializer.is_valid():
            feed_serializer.save()
            return JsonResponse(feed_serializer.data, status=status.HTTP_202_ACCEPTED)
        return JsonResponse(feed_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        feed.delete()
        return JsonResponse({'message': 'Feed was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)