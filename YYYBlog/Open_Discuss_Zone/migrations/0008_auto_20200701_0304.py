# Generated by Django 3.0.3 on 2020-06-30 19:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Open_Discuss_Zone', '0007_auto_20200205_1513'),
    ]

    operations = [
        migrations.AlterField(
            model_name='话题',
            name='模板',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Open_Discuss_Zone.讨论_界面模板'),
        ),
    ]
