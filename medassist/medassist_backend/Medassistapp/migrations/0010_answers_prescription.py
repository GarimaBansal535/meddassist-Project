# Generated by Django 4.2.3 on 2023-11-14 10:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Medassistapp', '0009_rename_category_subquestion_category_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Answers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('currentdate', models.CharField(default='', max_length=200)),
                ('currenttime', models.CharField(default='', max_length=200)),
                ('ansdata', models.CharField(default='', max_length=4000)),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Medassistapp.doctors')),
                ('userregistration', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='Medassistapp.userregistration')),
            ],
        ),
        migrations.CreateModel(
            name='Prescription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('currentdate', models.CharField(default='', max_length=200)),
                ('currenttime', models.CharField(default='', max_length=200)),
                ('tests', models.CharField(default='', max_length=200)),
                ('diet', models.CharField(default='', max_length=200)),
                ('medicine', models.CharField(default='', max_length=1000)),
                ('answer', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='Medassistapp.answers')),
                ('doctor', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='Medassistapp.doctors')),
                ('patient', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='Medassistapp.userregistration')),
            ],
        ),
    ]
