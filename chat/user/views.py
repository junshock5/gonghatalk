import json

from django.core import serializers
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from chat.models import User
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
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"user": new_user}, status=status.HTTP_200_OK)
    if request.method == 'DELETE':
        return UserAPI().User.delete(request)
    if request.method == 'PUT':
        return UserAPI().User.copy(request)


@csrf_exempt
@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def user_login(request):
    assert request is not None
    if request.method == 'POST':
        request_user = json.loads(request.body)['body']
        # 로그인 유저의 email 이 있는지 찾아 본다
        if User.objects.filter(email=request_user['email']).exists():
            user_obj = User.objects.get(email=request_user['email'])
        # 있다면 password 정보가 맞는지 확인 한다
        if user_obj is not None:
            if user_obj.passWord == request_user['passWord']:
                user_obj = UserSerializer(user_obj).data
                return Response(user_obj, content_type="text/json-comment-filtered", status=status.HTTP_200_OK)
            else:
                return Response(user_obj, status=status.HTTP_401_UNAUTHORIZED)
