# Generated by Django 2.1.2 on 2018-11-25 15:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Entry', '0011_delete_访问者'),
    ]

    operations = [
        migrations.CreateModel(
            name='访问者',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('权限等级', models.CharField(max_length=20)),
                ('密码', models.CharField(blank=True, max_length=200)),
                ('IP地址', models.CharField(max_length=50)),
                ('访问时间', models.DateField()),
                ('停留时间', models.TimeField()),
            ],
        ),
    ]
