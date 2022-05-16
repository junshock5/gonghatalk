import json

from django.conf import settings
from chat.utils.model import UserResource


class UserAPI:
    User: UserResource

    def __init__(self):
        config = settings
        self.User = UserResource(config.ARA_HOST, config.ARA_PORT)

    def __repr__(self):
        return json.dump(self.__dict__)

