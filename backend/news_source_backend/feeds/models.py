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
    published = models.DateTimeField(auto_now=True, blank=False)
    
    def fill_article_info(self, entry):
        self.item_title = entry.title
        self.item_url = entry.link
            
        summary = BeautifulSoup(entry.summary, 'html.parser')

        self.image_source = ''
        try:
            image = entry.media_content[0]['url']
            self.image_source = image
        except:
            if (summary.find('img')) is not None:
                image = summary.img.extract()
                self.image_source = image['src']
        finally:
            for e in summary.findAll('br'):
                e.extract()
            
        self.summary = str(summary)
        self.published = parser.parse(entry.published)
    
    class Meta:
        managed = False