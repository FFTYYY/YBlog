# Generated by Django 4.0.3 on 2022-11-02 06:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('articlezone', '0019_node_cache'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='node',
            name='concepts',
        ),
    ]