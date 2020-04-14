from sentry_sdk import init as sentry_init
from app import app
from app.utils.logger import get_logger
from app.utils.config import get_config

SENTRY_DSN = get_config('SENTRY_DSN')
log = get_logger(__name__)


if __name__ == '__main__':
    log.info('Starting InventoryService')

    if SENTRY_DSN:
        sentry_init(SENTRY_DSN)

    app.run(host='0.0.0.0', port=5000, debug=get_config('DEBUG', default=False))
