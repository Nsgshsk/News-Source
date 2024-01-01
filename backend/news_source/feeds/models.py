from django.db import models

# Create your models here.
class Feed(models.Model):
    source_name = models.CharField(max_length=70, blank=False, default='')
    category = models.CharField(max_length=50, blank=False, default='')
    source_url = models.URLField(blank=False, default='')
    last_update = models.DateTimeField(auto_now=True, blank=False)
    feed_information = models.JSONField(blank=False, default=dict)
    
    