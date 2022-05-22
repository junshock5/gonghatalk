import json

from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from chat.serializers import UserSerializer
from chat.utils.ApiWrapper import UserAPI


@csrf_exempt
@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def user(request):
    assert request is not None
    if request.method == 'GET':
        return UserAPI().User.download(request)
    if request.method == 'POST':
        new_user = None
        if 'body' in json.loads(request.body):
            serializer = UserSerializer(data=json.loads(request.body)['body'])
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"user": new_user}, status=status.HTTP_200_OK)
    if request.method == 'DELETE':
        return UserAPI().User.delete(request)
    if request.method == 'PUT':
        return UserAPI().User.copy(request)
