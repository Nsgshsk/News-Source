# Generated by Django 5.0 on 2024-02-14 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feeds', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='feeds',
            field=models.ManyToManyField(to='feeds.feed'),
        ),
    ]
