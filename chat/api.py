import json

from rest_framework import filters
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from chat.models import Room
from chat.models import Message
from chat.serializers import RoomSerializer
from chat.serializers import MessageSerializer


class RoomViewSet(mixins.CreateModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def create(self, request, *args, **kwargs):
        if 'body' in json.loads(request.body):
            serializer = RoomSerializer(data=json.loads(request.body)['body'])
            if serializer.is_valid():
                serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class MessageViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_queryset(self):
        label = self.request.query_params.get('label', None)
        limit = self.request.query_params.get('limit', 50)

        if label:
            queryset = Message.objects.filter(room__label=label)
        else:
            queryset = Message.objects.filter()

        return queryset[:int(limit)]
