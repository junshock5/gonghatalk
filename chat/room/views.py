import json

from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from chat.models import Room


@csrf_exempt
@api_view(['GET'])
def roomList(request):
    assert request is not None
    if request.method == 'GET':
        qs = Room.objects.all()
        list = json.loads(serializers.serialize('json', qs))
        response = []
        for i in range(len(list)):
            response.append(list[i].get('fields'))
    return Response(response, status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['GET'])
def myRoomList(request):
    assert request.query_params is not {}
    email = request.query_params['email']
    if request.method == 'GET':
        qs = Room.objects.all()
        list = json.loads(serializers.serialize('json', qs))
        response = []
        for i in range(len(list)):
            temp = list[i].get('fields')
            if email == temp['userEmail']:
                response.append(temp)
    return Response(response, status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['DELETE'])
def room(request):
    assert request is not None
    if request.method == 'DELETE':
        qs = Room.objects.all()
        list = json.loads(serializers.serialize('json', qs))
        response = []
        for i in range(len(list)):
            response.append(list[i].get('fields'))
    return Response(response, status=status.HTTP_200_OK)