# Generated by Django 2.1.2 on 2018-11-25 14:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Entry', '0009_auto_20181125_2242'),
    ]

    operations = [
        migrations.RenameField(
            model_name='访问者',
            old_name='权限等级',
            new_name='名',
        ),
        migrations.RemoveField(
            model_name='访问者',
            name='IP地址',
        ),
        migrations.RemoveField(
            model_name='访问者',
            name='密码',
        ),
    ]
