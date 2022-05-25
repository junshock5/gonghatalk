from importlib.resources import path

from django.conf.urls import url

from chat.user.views import user, user_login

urlpatterns = [
    url('register', user, name="user"),
    url('login', user_login, name="user"),
]
