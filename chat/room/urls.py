from django.conf.urls import url

from chat.room.views import roomList, myRoomList

urlpatterns = [
    url('list', roomList, name="user"),
    url('myList', myRoomList, name="myRoomList"),

]
