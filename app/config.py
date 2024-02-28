import logging
from logging.handlers import RotatingFileHandler
import os

def setup_logging():
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger("uvicorn")
    logger.setLevel(logging.INFO)

    # 로그 파일 설정
    log_file_path = os.path.join(os.getcwd(), "app_logs.log")
    file_handler = RotatingFileHandler(log_file_path, maxBytes=1024*1024*5, backupCount=5)
    file_handler.setLevel(logging.INFO)
    formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
    file_handler.setFormatter(formatter)

    logger.addHandler(file_handler)

# 애플리케이션 실행 시 로깅 설정 호출
setup_logging()