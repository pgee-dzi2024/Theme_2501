from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('signin', views.LoginUser.as_view(), name='login'),
    path('signup', views.signup, name='register'),
    path('logout', views.logout_user, name='logout'),
]
