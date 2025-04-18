# Generated by Django 4.2.20 on 2025-04-12 12:08

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gender', models.BooleanField(choices=[(True, 'мъж'), (False, 'жена')], default=True, verbose_name='Пол')),
                ('access_level', models.PositiveSmallIntegerField(choices=[(1, 'Системен администратор'), (2, 'НАБЛЮДАВАЩ АДМИНИСТРАТОР'), (3, 'УЧИЛИЩЕН АДМИНИСТРАТОР'), (4, 'УЧИТЕЛ'), (5, 'УЧЕНИК')], default=5, help_text='роля (ниво на достъп)', verbose_name='Роля')),
                ('session_theme', models.PositiveSmallIntegerField(default=1, help_text='номер на тема от НИП по подразбиране', validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(18)], verbose_name='Тема')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Пофил на потребител',
                'verbose_name_plural': 'Пофили на потребител',
            },
        ),
    ]
