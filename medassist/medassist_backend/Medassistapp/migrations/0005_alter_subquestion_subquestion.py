# Generated by Django 4.2.3 on 2023-10-31 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Medassistapp', '0004_alter_subquestion_subquestion'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subquestion',
            name='subquestion',
            field=models.CharField(default='', max_length=200),
        ),
    ]
