from chat.utils.LoggingHelper import LoggingHelper
from chat.utils.model.UriResource import HttpHelperV2


class UserResource:
    http_helper: HttpHelperV2

    def __init__(self, host: str, port: int):
        self.http_helper = HttpHelperV2(host=host, port=port)

    def register(self, body: dict, request=None):
        uri = "/proxy/api/auth/login"
        response = self.http_helper.post(uri, None, body, request)
        LoggingHelper.logging_info('uri={}, method={}, response={}'.format(uri, 'POST', response))
        return response

    def get_tags(self, query_dict: dict, headers):
        uri = "/proxy/api/tag?{}".format(query_dict.urlencode())
        response = self.http_helper.get(uri, headers=headers)
        LoggingHelper.logging_info('uri={}, method={}, response={}'.format(uri, 'GET', response))
        return response

    def check_permission(self, query_dict: str, headers):
        uri = f"/proxy/api/resource/check?{query_dict}"
        response = self.http_helper.get(uri, headers=headers)
        LoggingHelper.logging_info('uri={}, method={}, response={}'.format(uri, 'GET', response))
        return response

    def check_token(self, headers):
        uri = "/proxy/api/auth/check"
        response = self.http_helper.get(uri, headers=headers)
        LoggingHelper.logging_info('uri={}, method={}, response={}'.format(uri, 'GET', response))
        return response

    def refresh_token(self, headers):
        uri = "/proxy/api/auth/refresh"
        response = self.http_helper.post(uri, headers, None)
        LoggingHelper.logging_info('uri={}, method={}, response={}'.format(uri, 'POST', response))
        return response
