# Generated by Django 4.0.1 on 2022-03-01 03:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('articlezone', '0007_comment_rename_component_concept_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='father',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='comments', to='articlezone.node'),
        ),
        migrations.AlterField(
            model_name='node',
            name='concepts',
            field=models.ManyToManyField(blank=True, related_name='place', to='articlezone.Concept'),
        ),
    ]
