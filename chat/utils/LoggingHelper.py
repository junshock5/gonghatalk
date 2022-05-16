import datetime
import json
import logging
from logging.handlers import TimedRotatingFileHandler

from django.conf import settings


class LoggingHelper(object):
    @staticmethod
    def logging_debug(ex):
        logger = logging.getLogger("debug_logger")
        if not logger.hasHandlers():
            formatter = logging.Formatter('[%(levelname)s|%(filename)s:%(lineno)s] %(asctime)s > %(message)s')
            logger_level = logging.DEBUG
            logging_filename = getattr(settings, 'LOG_FOLDER') + "/debug.log"

            file_handler = TimedRotatingFileHandler(logging_filename, when='h', interval=1, backupCount=24,
                                                    encoding='utf-8')  # 1시간마다 파일 교체
            file_handler.setFormatter(formatter)

            logger.setLevel(logger_level)
            logger.addHandler(file_handler)

        if isinstance(ex, Exception):
            exception_info = (type(ex), ex, ex.__traceback__)
            logger.debug("DEBUG DATA", exc_info=exception_info)
        else:
            logger.debug(ex)

    @staticmethod
    def log_audit(src_ip=None, username=None, content=None, component=None, action_item=None, action=None, action_result=None,
                  req_uri=None, req_domain=None, service_code=None, endpoint_name=None):

        logger = logging.getLogger("audit_logger")
        if not logger.hasHandlers():
            formatter = logging.Formatter('%(message)s')
            logger_level = logging.INFO
            logging_filename = getattr(settings, 'LOG_FOLDER') + "/audit.log"

            file_handler = TimedRotatingFileHandler(logging_filename, when='h', interval=1, backupCount=24,
                                                    encoding='utf-8')  # 1시간마다 파일 교체
            file_handler.setFormatter(formatter)
            logger.setLevel(logger_level)
            logger.addHandler(file_handler)
        body = {
            "evt_time": datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.%f%zZ"),
            "src_ip": src_ip,  # 접근한 IP 정보
            "src_username": username,  # 법인 + 사번
            "component": component.decode('utf-8'),  # 액세스한 페이지 정보
            "action_item": action_item,  # 세부 수행기능
            "content": str(content),
            "action": action,  # 액션 구분 값
            # 조회: search/get
            # 등록(추가)/수정/삭제: add/modify/delete
            # 파일 업/다운로드: upload/download
            # 서버/기능: on/off
            # 명령: execute/cancel
            # 결재: approval/reject
            # 제재: ban/kick
            # 배포: deploy
            "action_result": action_result,  # 액션 결과
            "req_uri": req_uri,
            "req_domain": req_domain,
            "service_code": service_code,
            "endpoint_name": endpoint_name,
        }
        # CoreAPI().Audit.send_log(service_code=service_code, log=body, log_send=True)
        logger.info(json.dumps(body))

    @staticmethod
    def log_action(user_name, action_type, target_type, detail_log):
        logger = logging.getLogger("action_logger")
        if not logger.hasHandlers():
            formatter = logging.Formatter('[%(levelname)s|%(filename)s:%(lineno)s] %(asctime)s > %(message)s')
            logger_level = logging.INFO
            logging_filename = getattr(settings, 'LOG_FOLDER') + "/action.log"

            file_handler = TimedRotatingFileHandler(logging_filename, when='h', interval=1, backupCount=24,
                                                    encoding='utf-8')  # 1시간마다 파일 교체
            file_handler.setFormatter(formatter)
            logger.setLevel(logger_level)
            logger.addHandler(file_handler)

        body = {
            'userName': user_name,
            'actionType': action_type,
            'targetType': target_type,
            'detailLog': detail_log,
        }
        logger.info(json.dumps(body))

    # 유저의 액션을 로깅하는 메서드임. 다른 용도로는 쓰지말것.
    @staticmethod
    def logging_action(username, uri, payload, method=None):
        logger = logging.getLogger("action_logger")
        if not logger.hasHandlers():
            formatter = logging.Formatter('[%(levelname)s|%(filename)s:%(lineno)s] %(asctime)s > %(message)s')
            logger_level = logging.INFO
            logging_filename = getattr(settings, 'LOG_FOLDER') + "/action.log"

            file_handler = TimedRotatingFileHandler(logging_filename, when='h', interval=1, backupCount=24,
                                                    encoding='utf-8')  # 1시간마다 파일 교체
            file_handler.setFormatter(formatter)
            logger.setLevel(logger_level)
            logger.addHandler(file_handler)

        body = ""
        if isinstance(payload, bytes):
            body = payload.decode("utf-8")

        body = {
            'userName': username,
            'uri': uri,
            'body': body,
            'method': method
        }
        logger.info(json.dumps(body))

    @staticmethod
    def logging_info(ex):
        logger = logging.getLogger("info_logger")
        if not logger.hasHandlers():
            formatter = logging.Formatter('[%(levelname)s|%(filename)s:%(lineno)s] %(asctime)s > %(message)s')
            logger_level = logging.INFO
            logging_filename = getattr(settings, 'LOG_FOLDER') + "/info.log"

            file_handler = TimedRotatingFileHandler(logging_filename, when='h', interval=1, backupCount=24,
                                                    encoding='utf-8')  # 1시간마다 파일 교체
            file_handler.setFormatter(formatter)
            logger.setLevel(logger_level)
            logger.addHandler(file_handler)

        if isinstance(ex, Exception):
            exception_info = (type(ex), ex, ex.__traceback__)
            logger.info("INFORMATION DATA", exc_info=exception_info)
        else:
            logger.info(ex)

    @staticmethod
    def logging_error(ex):
        logger = logging.getLogger("error_logger")
        if not logger.hasHandlers():
            formatter = logging.Formatter('[%(levelname)s|%(filename)s:%(lineno)s] %(asctime)s > %(message)s')
            logger_level = logging.ERROR
            logging_filename = getattr(settings, 'LOG_FOLDER') + "/error.log"

            file_handler = TimedRotatingFileHandler(logging_filename, when='h', interval=1, backupCount=24,
                                                    encoding='utf-8')  # 1시간마다 파일 교체
            file_handler.setFormatter(formatter)
            logger.setLevel(logger_level)
            logger.addHandler(file_handler)

        if isinstance(ex, Exception):
            exception_info = (type(ex), ex, ex.__traceback__)
            logger.error("ERROR OCCURRED", exc_info=exception_info)
        else:
            logger.error(ex)
