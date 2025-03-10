# Generated by Django 4.2.3 on 2023-11-14 10:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Medassistapp', '0010_answers_prescription'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answers',
            name='userregistration',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Medassistapp.userregistration'),
        ),
        migrations.AlterField(
            model_name='prescription',
            name='answer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Medassistapp.answers'),
        ),
        migrations.AlterField(
            model_name='prescription',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Medassistapp.userregistration'),
        ),
    ]
