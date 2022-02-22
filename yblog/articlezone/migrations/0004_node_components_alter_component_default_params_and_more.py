# Generated by Django 4.0.1 on 2022-02-22 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articlezone', '0003_node_create_time_node_father_node_index_in_father_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='node',
            name='components',
            field=models.ManyToManyField(related_name='place', to='articlezone.Component'),
        ),
        migrations.AlterField(
            model_name='component',
            name='default_params',
            field=models.TextField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='component',
            name='extra_params',
            field=models.TextField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='component',
            name='fixed_params',
            field=models.TextField(blank=True, default='', null=True),
        ),
    ]
