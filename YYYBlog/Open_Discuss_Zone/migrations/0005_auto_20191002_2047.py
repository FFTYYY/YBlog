# Generated by Django 2.1.2 on 2019-10-02 12:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Open_Discuss_Zone', '0004_话题_模板'),
    ]

    operations = [
        migrations.RenameField(
            model_name='言论',
            old_name='留言者称呼',
            new_name='称呼',
        ),
        migrations.RenameField(
            model_name='言论',
            old_name='留言者邮箱',
            new_name='邮箱',
        ),
    ]
