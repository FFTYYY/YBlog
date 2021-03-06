# Generated by Django 2.1.2 on 2019-05-29 10:14

import ckeditor_uploader.fields
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='界面模板',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('名', models.CharField(max_length=200)),
                ('封面位置', models.CharField(blank=True, max_length=200)),
                ('封底位置', models.CharField(blank=True, max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='留言',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('内容', models.TextField(default='')),
                ('留言者称呼', models.CharField(default='匿名', max_length=200)),
                ('留言者邮箱', models.CharField(blank=True, max_length=200)),
                ('创建时间', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='节点',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('名', models.CharField(max_length=200)),
                ('地址', models.CharField(blank=True, default='', max_length=200)),
                ('创建时间', models.DateTimeField(default=django.utils.timezone.now)),
                ('最后修改时间', models.DateTimeField(default=django.utils.timezone.now)),
                ('内容类型', models.IntegerField(choices=[(0, 'html（Django模板）'), (3, 'html（非Django模板）'), (1, 'txt'), (2, 'md'), (4, 'pdf')], default=0)),
                ('节点类型', models.IntegerField(choices=[(0, '文章'), (1, '集')], default=0)),
                ('界面强化标签', models.CharField(blank=True, default='', max_length=200)),
                ('排序依据', models.IntegerField(default=0)),
                ('最低访问等级需求', models.IntegerField(default=0)),
                ('内容', ckeditor_uploader.fields.RichTextUploadingField(blank=True, default='')),
                ('模板', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Article_Zone.界面模板')),
                ('父', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='子', to='Article_Zone.节点')),
            ],
        ),
        migrations.AddField(
            model_name='留言',
            name='对象',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='留言', to='Article_Zone.节点'),
        ),
    ]
