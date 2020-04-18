echo "starting worker daemons..."
celery worker -A $WORKER_NAME --loglevel=$LOG_LEVEL
