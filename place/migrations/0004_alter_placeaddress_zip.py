# Generated by Django 3.2.5 on 2022-01-04 21:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('place', '0003_auto_20220104_2037'),
    ]

    operations = [
        migrations.AlterField(
            model_name='placeaddress',
            name='zip',
            field=models.CharField(max_length=64),
        ),
    ]
