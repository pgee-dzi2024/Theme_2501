# Generated by Django 4.2.20 on 2025-04-13 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='session_theme',
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='access_level',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Системен администратор'), (2, 'УЧИТЕЛ'), (3, 'УЧЕНИК')], default=3, help_text='роля (ниво на достъп)', verbose_name='Роля'),
        ),
    ]
