# Generated by Django 4.2.3 on 2023-10-31 09:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Medassistapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='question',
            field=models.CharField(default='', max_length=1000),
        ),
    ]
