# Generated by Django 4.0.1 on 2022-03-06 19:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articlezone', '0012_node_secret'),
    ]

    operations = [
        migrations.AlterField(
            model_name='node',
            name='secret',
            field=models.BooleanField(default=True),
        ),
    ]