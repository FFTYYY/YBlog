# Generated by Django 3.2.7 on 2021-09-08 13:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Article_Zone', '0007_auto_20210418_0227'),
    ]

    operations = [
        migrations.AlterField(
            model_name='界面模板',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='留言',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='节点',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='附加',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
