# Generated by Django 3.1.2 on 2021-04-17 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Article_Zone', '0004_auto_20200620_0329'),
    ]

    operations = [
        migrations.CreateModel(
            name='附加',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('名', models.CharField(max_length=200)),
                ('内容', models.TextField(default='')),
            ],
        ),
        migrations.AddField(
            model_name='节点',
            name='附加内容',
            field=models.ManyToManyField(related_name='所在', to='Article_Zone.附加'),
        ),
    ]
