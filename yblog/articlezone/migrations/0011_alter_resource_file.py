# Generated by Django 4.0.1 on 2022-03-05 17:14

import articlezone.models.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articlezone', '0010_rename_file_resource'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource',
            name='file',
            field=models.FileField(upload_to=articlezone.models.models.upload_to),
        ),
    ]