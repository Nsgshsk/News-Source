from django.shortcuts import render
from feedparser import parse
import json

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from feeds.models import Feed, FeedItem
from feeds.serializers import FeedSerializer, FeedItemSerializer

# Create your views here.
class FeedList(APIView):
    permission_classes = [IsAuthenticated]
    jwt_authentication = JWTAuthentication()
    
    def get(self, request):
        feeds = Feed.objects.all()
        serialized_feeds = FeedSerializer(feeds, many=True)
        
        return Response(data=serialized_feeds.data, status=status.HTTP_202_ACCEPTED)
    
    def post(self, request):
        response = self.jwt_authentication.authenticate(request)
        
        if response is None:
            return Response({'message': 'No token is provided in the header or the header is missing!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user, token = response
        
        if not user.is_superuser:
            return Response({'message': 'Unauthorized user!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = FeedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Invalid request!'}, status=status.HTTP_400_BAD_REQUEST)
        
    def put(self, request):
        response = self.jwt_authentication.authenticate(request)
        
        if response is None:
            return Response({'message': 'No token is provided in the header or the header is missing!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user, token = response
        
        if not user.is_superuser:
            return Response({'message': 'Unauthorized user!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = FeedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.update()
            return Response(data=serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({'message': 'Invalid request!'}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request):
        response = self.jwt_authentication.authenticate(request)
        
        if response is None:
            return Response({'message': 'No token is provided in the header or the header is missing!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user, token = response
        
        if not user.is_superuser:
            return Response({'message': 'Unauthorized user!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = FeedSerializer(data=request.data)
        if serializer.is_valid():
            Feed.objects.filter(pk=serializer.validated_data['id']).delete()
            return Response({'message': 'Feed deleted!'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'message': 'Invalid request!'}, status=status.HTTP_400_BAD_REQUEST)

class UserFeedList(APIView):
    permission_classes = [IsAuthenticated]
    jwt_authentication = JWTAuthentication()
    
    def get(self, request):
        response = self.jwt_authentication.authenticate(request)
        
        if response is None:
            return Response({'message': 'No token is provided in the header or the header is missing!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user, token = response
        
        user_feeds = user.feeds.all()
        if user_feeds:
            user_feeds_serialized = FeedSerializer(user_feeds, many=True)
            return Response(data=user_feeds_serialized.data, status=status.HTTP_302_FOUND)
        else:
            return Response({'message': f'There are no feeds for {user.first_name}!'} ,status=status.HTTP_204_NO_CONTENT)
        
    def put(self, request):
        response = self.jwt_authentication.authenticate(request)
        
        if response is None:
            return Response({'message': 'No token is provided in the header or the header is missing!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user, token = response
        
        user.feeds.set(request.data['feedids'])
        
        user_feeds_serialized = FeedSerializer(user.feeds.all(), many=True)
        
        return Response(data=user_feeds_serialized.data, status=status.HTTP_202_ACCEPTED)
    
class FeedItemsList(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id):
        feed = Feed.objects.get(pk=id)
        feedItems = []
        
        if feed is None:
            return Response({'message': 'Feed not found!'}, status=status.HTTP_404_NOT_FOUND)
        
        feed = parse(feed.source_url)
        for entry in feed.entries:
            feedItem = FeedItem()
            feedItem.fill_article_info(entry)
            
            feedItems.append(feedItem)
        
        feedItems = FeedItemSerializer(feedItems, many=True)
        return Response(data=feedItems.data, status=status.HTTP_302_FOUND)
    
class UserFeedItemsList(APIView):
    permission_classes = [IsAuthenticated]
    jwt_authentication = JWTAuthentication()
    
    def get(self, request):
        response = self.jwt_authentication.authenticate(request)
        
        if response is None:
            return Response({'message': 'No token is provided in the header or the header is missing!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user, token = response
        
        user_feeds = user.feeds.all()
        feedItems = []
        
        if not user_feeds:
            return Response({'message': 'Feed not found!'}, status=status.HTTP_404_NOT_FOUND)
        
        for feed in user_feeds:
            feed = parse(feed.source_url)
            for entry in feed.entries:
                feedItem = FeedItem()
                feedItem.fill_article_info(entry)
                
                feedItems.append(feedItem)
        
        feedItems.sort(reverse=True, key=lambda item: item.published)
        
        feedItems = FeedItemSerializer(feedItems, many=True)
        return Response(data=feedItems.data, status=status.HTTP_302_FOUND)