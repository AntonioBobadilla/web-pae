# Generated by Django 4.0.4 on 2022-04-24 20:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tutor',
            old_name='completedHours',
            new_name='completed_hours',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='registrationNumber',
            new_name='registration_number',
        ),
    ]
