# Generated by Django 4.1.5 on 2024-01-02 11:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articlezone', '0029_alter_conceptinstance_concept_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='node',
            name='template',
            field=models.TextField(default='standard'),
        ),
    ]
