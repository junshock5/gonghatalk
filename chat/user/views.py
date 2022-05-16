from django.core.serializers import json
from django.views.decorators.csrf import csrf_exempt
from requests import Response
from rest_framework.decorators import api_view

from chat.consumers import log
from chat.models import User
from chat.utils.ApiWrapper import UserAPI
from chat.utils.model.UriResource import HttpResponse


@csrf_exempt
@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def user(request):
    assert request is not None
    if request.method == 'GET':
        return UserAPI().User.download(request)
    if request.method == 'POST':
        # try:
        user = User.objects.create(name=request.data['name'],
                                   email=request.data['email'],
                                   passWord=request.data['passWord'])
        # except Exception as e:
        #     log.debug('user=%s', e)
        return HttpResponse(request.data, user)
        # return UserAPI().User.register(request, json.loads(request.body))
    if request.method == 'DELETE':
        return UserAPI().User.delete(request)
    if request.method == 'PUT':
        return UserAPI().User.copy(request)
