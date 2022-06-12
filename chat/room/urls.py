from django.conf.urls import url

from chat.room.views import roomList, myRoomList, room

urlpatterns = [
    url('list', roomList, name="user"),
    url('myList', myRoomList, name="myRoomList"),
    url('room', room, name="room"),
]
