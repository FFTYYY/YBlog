# Generated by Django 4.0.1 on 2022-04-05 20:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articlezone', '0015_alter_concept_fixed_params_alter_concept_meta'),
    ]

    operations = [
        migrations.AlterField(
            model_name='concept',
            name='meta',
            field=models.CharField(choices=[['昭言', '昭言'], ['随言', '随言'], ['属言', '属言'], ['齐言', '齐言'], ['穆言', '穆言'], ['数学言', '数学言'], ['裱示', '裱示'], ['彰示', '彰示'], ['格示', '格示'], ['强调', '强调'], ['刊调', '刊调'], ['链调', '链调'], ['图调', '图调'], ['数学调', '数学调'], ['新段', '新段'], ['次节', '次节'], ['小节线', '小节线'], ['章节线', '章节线']], max_length=200),
        ),
    ]
