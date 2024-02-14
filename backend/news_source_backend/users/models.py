from django.db import models
from django.contrib.auth.models import AbstractUser

from feeds.models import Feed

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(("email address"), blank=False, unique=True)
    username = None;
    
    feeds = models.ManyToManyField(Feed)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    