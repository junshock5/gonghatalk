from importlib.resources import path

from django.conf.urls import url

from chat.user.views import user

urlpatterns = [
    url('register', user, name="user"),
]
