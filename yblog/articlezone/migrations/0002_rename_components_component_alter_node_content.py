# Generated by Django 4.0.1 on 2022-01-23 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articlezone', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Components',
            new_name='Component',
        ),
        migrations.AlterField(
            model_name='node',
            name='content',
            field=models.TextField(blank=True, default=''),
        ),
    ]
