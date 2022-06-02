from rest_framework import serializers
from chat.models import Room, User
from chat.models import Message


class RoomSerializer(serializers.ModelSerializer):
    timestamp = serializers.CharField(source="formatted_timestamp", read_only=True)
    class Meta:
        model = Room
        fields = ['label', 'userEmail', 'timestamp']


class MessageSerializer(serializers.ModelSerializer):
    timestamp = serializers.CharField(source="formatted_timestamp", read_only=True)

    class Meta:
        model = Message
        fields = ['room', 'handle', 'message', 'timestamp', 'writer']


class UserSerializer(serializers.ModelSerializer):
    timestamp = serializers.CharField(source="formatted_timestamp", read_only=True)
    class Meta:
        model = User
        fields = ['name', 'email', 'passWord', 'timestamp']
