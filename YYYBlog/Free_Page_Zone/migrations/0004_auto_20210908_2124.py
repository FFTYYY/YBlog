# Generated by Django 3.2.7 on 2021-09-08 13:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Free_Page_Zone', '0003_页文件'),
    ]

    operations = [
        migrations.AlterField(
            model_name='页',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='页文件',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]