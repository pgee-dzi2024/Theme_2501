from django.contrib.auth.views import LoginView
from django.shortcuts import render, redirect, get_object_or_404
from .forms import LoginUserForm
from django.urls import reverse_lazy
from django.contrib.auth import logout
from .models import *
from django.http import JsonResponse

from django.db import transaction


def make_context(request):
    user = request.user
    if user.is_authenticated:
        user_profile = user.userprofile

        context = {
            'tab_title': 'начало',
            'user_nick': user.username,
            'user_name': user.first_name+' '+user.last_name,
            'user_first_name': user.first_name,
            'user_level': USER_LEVEL[user_profile.access_level-1][1],
            'user_profile': user_profile,
        }
    else:
        context = {
            'tab_title': 'начало',
        }
    return context


def index(request):
    return render(request, 'main/index.html', make_context(request))


from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import UserEditForm, UserProfileEditForm

@login_required
def edit(request):
    if request.method == 'POST':
        user_form = UserEditForm(request.POST, instance=request.user)
        profile_form = UserProfileEditForm(request.POST, instance=request.user.userprofile)

        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            return redirect('profile_view')  # Пренасочване към профилна страница след успешно записване.
    else:
        user_form = UserEditForm(instance=request.user)
        profile_form = UserProfileEditForm(instance=request.user.userprofile)

    context = make_context(request) | {
        'user_form': user_form,
        'profile_form': profile_form,
        'user': request.user
    }
    return render(request, 'main/edit.html', context)


def signin(request):
    context = {
        'tab_title': 'вход',
    }
    return render(request, 'main/signin.html', context)


class DataMixin:
    def get_user_context(self, **kwargs):
        context = kwargs
        return context


class LoginUser(DataMixin, LoginView):
    form_class = LoginUserForm
    template_name = 'main/signin.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        c_def = self.get_user_context(title="ВХОД")
        return dict(list(context.items())+list(c_def.items()))

    def get_success_url(self):
        user = self.request.user
        if user.is_active:
            user = self.request.user
            return reverse_lazy('home')
        else:
            return reverse_lazy('login')


def logout_user(request):
    logout(request)
    return redirect('home')


def signup(request):
    return render(request, 'main/signup.html')

