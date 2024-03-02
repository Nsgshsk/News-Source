from feedparser import parse

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers

from feeds.models import Feed, FeedItem
from feeds.serializers import FeedSerializer, FeedItemSerializer

# Create your views here.
class FeedList(APIView):
    permission_classes = [IsAuthenticated]
    jwt_authentication = JWTAuthentication()
    
    def get(self, request):
        response = self.jwt_authentication.authenticate(request)
        
        if response is None:
            return Response({'message': 'No token is provided in the header or the header is missing!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user, token = response
        
        feeds = Feed.objects.exclude(id__in = user.feeds.values_list('id', flat=True))
        serialized_feeds = FeedSerializer(feeds, many=True)
        
        return Response(data=serialized_feeds.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        response = self.jwt_authentication.authenticate(request)
        
        if response is None:
            return Response({'message': 'No token is provided in the header or the header is missing!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user, token = response
        
        """ if not user.is_superuser:
            return Response({'message': 'Unauthorized user!'}, status=status.HTTP_401_UNAUTHORIZED) """
        
        for url in request.data['feedurls']:
            Feed.create_feed_info(url)
        
        serializer = FeedSerializer(Feed.objects.all(), many=True)
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        
    def patch(self, request):
        response = self.jwt_authentication.authenticate(request)
        
        if response is None:
            return Response({'message': 'No token is provided in the header or the header is missing!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user, token = response
        
        """ if not user.is_superuser:
            return Response({'message': 'Unauthorized user!'}, status=status.HTTP_401_UNAUTHORIZED) """
        
        feed = Feed.objects.get(pk=request.data['id'])
        serializer = FeedSerializer(feed, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(data=serializer.data, status=status.HTTP_400_BAD_REQUEST)
        
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
            return Response(data=user_feeds_serialized.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': f'There are no feeds for {user.first_name}!'} ,status=status.HTTP_204_NO_CONTENT)
        
    def post(self, request):
        response = self.jwt_authentication.authenticate(request)
        
        if response is None:
            return Response({'message': 'No token is provided in the header or the header is missing!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user, token = response
        
        user.feeds.add(request.data['feedid'])
        
        user_feeds_serialized = FeedSerializer(user.feeds.all(), many=True)
        
        return Response(data=user_feeds_serialized.data, status=status.HTTP_202_ACCEPTED)
    
    def delete(self, request):
        response = self.jwt_authentication.authenticate(request)
        
        if response is None:
            return Response({'message': 'No token is provided in the header or the header is missing!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user, token = response
        
        user.feeds.remove(request.data['feedid'])
        
        user_feeds_serialized = FeedSerializer(user.feeds.all(), many=True)
        
        return Response(data=user_feeds_serialized.data, status=status.HTTP_204_NO_CONTENT)
    
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
        return Response(data=feedItems.data, status=status.HTTP_200_OK)
    
class UserFeedItemsList(APIView):
    permission_classes = [IsAuthenticated]
    jwt_authentication = JWTAuthentication()
    
    @method_decorator(cache_page(60 * 15))
    @method_decorator(vary_on_headers("Authorization"))
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
        return Response(data=feedItems.data, status=status.HTTP_200_OK)