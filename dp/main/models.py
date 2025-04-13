from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime
from django.utils import timezone

"""
***************************************
            Потребители
***************************************
"""
# Роли
ADMIN = 1
TEACHER = 2
STUDENT = 3

USER_LEVEL = [
    (ADMIN, 'Системен администратор'),
    (TEACHER, 'УЧИТЕЛ'),
    (STUDENT, 'УЧЕНИК'),
]


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.BooleanField('Пол', default=True, choices=[(True, 'мъж'), (False, 'жена'), ] )
    access_level = models.PositiveSmallIntegerField('Роля', choices=USER_LEVEL, default=STUDENT,
                                                    help_text='роля (ниво на достъп)')
    session_theme = models.PositiveSmallIntegerField('Тема', default=1,
                                                     validators=[MinValueValidator(1), MaxValueValidator(18) ],
                                                     help_text='номер на тема от НИП по подразбиране')

    def __str__(self):
        return f'Потребител #{self.user.id}: {self.user.first_name} {self.user.last_name}'

    class Meta:
        verbose_name = 'Пофил на потребител'
        verbose_name_plural = 'Пофили на потребител'


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    print('===>>> create user')
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    print('===>>> save user')
    instance.userprofile.save()
