# Generated by Django 4.0.1 on 2022-03-06 19:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articlezone', '0011_alter_resource_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='node',
            name='secret',
            field=models.BooleanField(default=False),
        ),
    ]