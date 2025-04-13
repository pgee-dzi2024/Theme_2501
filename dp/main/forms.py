from django import forms
from .models import *
from django.contrib.auth.forms import AuthenticationForm


class LoginUserForm(AuthenticationForm):
    username = forms.CharField(label='Потребителско име', widget=forms.TextInput())
    password = forms.CharField(label='Парола', widget=forms.PasswordInput())
