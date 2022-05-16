import http.client
import http.client
import json
import ssl

from chat.helper.Encoder import ComplexEncoder
from chat.utils.LoggingHelper import LoggingHelper


class HttpResponse:
    body: dict
    response: http.client.HTTPResponse
    ex: Exception

    def __init__(self, body: dict, response: http.client.HTTPResponse, ex: Exception = None):
        self.body = body
        self.response = response
        self.ex = ex

    def embedded(self):
        """
        body가 List로 담겨있을 때, _embedded를 포함합니다.
        """
        if self.body is None:
            return None
        if '_embedded' in self.body:
            return self.body['_embedded']
        return None

    def links(self):
        """
        body가 List로 담겨있을 때, _links를 포함합니다.
        """
        if self.body is None:
            return None
        if '_links' in self.body:
            return self.body['_links']
        return None

    def __dict__(self):
        return dict(body=self.body)

    def __repr__(self):
        return '<SarHttpResponse body=%s ex=%s response=%s>' % (self.body, str(self.ex), self.response)

    def __str__(self):
        return self.__repr__()


class HttpHelperV2:
    host: str
    port: int
    timeout = 10.0  # 10초

    def __init__(self, host: str, port: int, timeout: float = 10.0):
        self.host = host
        self.port = port
        self.timeout = timeout

    def get(self, uri, headers: dict, request=None) -> HttpResponse:
        return self.request_data(uri, "GET", headers, None, request)

    def post(self, uri: str, headers: dict, body: dict, request=None) -> HttpResponse:
        return self.request_data(uri, "POST", headers, body, request)

    def patch(self, uri: str, headers: dict, body: dict, request=None) -> HttpResponse:
        return self.request_data(uri, "PATCH", headers, body, request)

    def delete(self, uri: str, headers: dict, request=None) -> HttpResponse:
        return self.request_data(uri, "DELETE", headers, None, request)

    def request_data(self, uri: str, method: str, headers: dict, body: any = None, request=None) -> HttpResponse:
        try:
            # header 초기화
            if headers is None:
                headers = {}
            if "Content-type" not in headers:
                headers["Content-type"] = "application/json"

            # body 유무에 따라 request 분기
            body_contents = []
            if isinstance(body, dict):
                body_contents = json.dumps(body, ensure_ascii=False, cls=ComplexEncoder).encode("utf-8")

            conn = self.get_conn()
            conn.request(method, uri, body_contents, headers=headers)
            response = conn.getresponse()
            response_body = response.read()
            conn.close()

            body_dict = {}
            if response_body is not None and response_body != b'':
                body_dict = json.loads(response_body)
            if str(response.code).startswith('5'):
                raise BadGateWayException()
            return HttpResponse(body_dict, response)
        except BadGateWayException as ex:
            raise BadGateWayException()
        except Exception as ex:
            LoggingHelper.logging_error(ex)
            print("===============================================================")
            print('RequestData.Exception: Raise Error : ', ex)
            print('Timeout  ', self.timeout)
            print('[{}] {}:{}{}'.format(method, self.host, self.port, uri))
            print("===============================================================")
            return HttpResponse(None, None, ex)

    def get_conn(self):
        if self.port == 443:
            return http.client.HTTPSConnection(self.host, timeout=self.timeout,
                                               context=ssl._create_unverified_context())
        else:
            return http.client.HTTPConnection(self.host, self.port, timeout=self.timeout)


class BadGateWayException(Exception):
    def __str__(self):
        return self.value


class BadRequestException(Exception):
    def __str__(self):
        return self.value
