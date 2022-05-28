from django.conf.urls import include, url
from django.views.generic import TemplateView
from rest_framework.routers import SimpleRouter
from . import views
from .api import RoomViewSet
from .api import MessageViewSet


router = SimpleRouter()

router.register(r'room', RoomViewSet, base_name="room")
router.register(r'message', MessageViewSet, base_name="message")


urlpatterns = [
    # url(r'^$',  views.about, name='about'),
    url(r'^$',  views.app, name='app'),
    # url(r'^new/$', views.new_room, name='new_room'),
    url(r'^api/', include(router.urls)),
    url(r'^api/user', include('chat.user.urls')),
    url(r'^room/(?P<label>[\w-]{,50})/$', views.chat_room, name='chat_room'),
    url(r'^(?!api|api-auth).*$', TemplateView.as_view(template_name='index.html')),
]
