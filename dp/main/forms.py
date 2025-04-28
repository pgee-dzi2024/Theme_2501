from django import forms
from .models import *
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User


class LoginUserForm(AuthenticationForm):
    username = forms.CharField(label='Потребителско име', widget=forms.TextInput())
    password = forms.CharField(label='Парола', widget=forms.PasswordInput())


class UserEditForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control', 'maxlength': '20'}),
            'first_name': forms.TextInput(attrs={'class': 'form-control', 'maxlength': '20'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control', 'maxlength': '40'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'maxlength': '40'}),
        }


class UserProfileEditForm(forms.ModelForm):
    ROLE_CHOICES = [
        (1, 'Администратор'),
        (2, 'Учител'),
        (3, 'Ученик'),
    ]

    GENDER_CHOICES = [
        (True, 'Мъж'),
        (False, 'Жена'),
    ]

    access_level = forms.ChoiceField(
        choices=ROLE_CHOICES,
        widget=forms.RadioSelect(attrs={'class': 'custom-control-input'}),
    )
    gender = forms.ChoiceField(
        choices=GENDER_CHOICES,
        widget=forms.RadioSelect(attrs={'class': 'custom-control-input'}),
    )

    class Meta:
        model = UserProfile
        fields = ['access_level', 'gender', ]
