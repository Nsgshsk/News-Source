from dateutil import parser
from bs4 import BeautifulSoup
from feedparser import parse
from django.db import models

# Create your models here.
class Feed(models.Model):
    source_name = models.CharField(max_length=150, blank=False, default='')
    source_image = models.URLField(blank=True, default='')
    source_description = models.CharField(max_length=255, blank=True, default='')
    source_url = models.URLField(blank=False, default='', unique=True)
    
    @classmethod
    def create_feed_info(cls, url):
        if cls.objects.filter(source_url=url):
            return False
        
        feed = cls()
        feed_info = parse(url)

        if feed_info.entries:
            feed.source_name = feed_info.feed.title
            try:
                feed.source_image = feed_info.feed.image.href
            except:
                try:
                    feed.source_image = feed_info.feed.logo
                except:
                    feed.source_image = ''
            feed.source_description = feed_info.feed.description
            feed.source_url = url
            
            feed.save()
            return True
        else:
            return False
    
    class Meta:
        ordering = ["source_name"]

class FeedItem(models.Model):
    item_title = models.CharField(max_length=150, blank=False, default='')
    item_category = models.CharField(max_length=100, blank=True, default='')
    item_url = models.URLField(blank=False, default='')
    image_source = models.URLField(blank=True, default='')
    summary = models.CharField(max_length=255, blank=True, default='')
    published = models.CharField(max_length=150, blank=False)
    
    def fill_article_info(self, entry):
        self.item_title = entry.title
        self.item_url = entry.link
            
        summary = BeautifulSoup(entry.summary, 'html.parser')
        image = ''
        
        if 'image' in entry:
            image = entry.image.src
        elif 'media_content' in entry:
            for media in entry.media_content:
                if type in media and media['type'] == 'image/jpeg':
                    image = media['url']
                    break;
        elif 'media_thumbnail' in entry:
            image = entry.media_thumbnail[0]['url']
        elif summary.find('img') is not None:
            image = summary.img.extract()['src']
        
        self.image_source = image
        self.summary = summary.get_text()
        self.published = parser.parse(entry.published).strftime('%a, %b %d %Y, %H:%M')
    
    class Meta:
        managed = False