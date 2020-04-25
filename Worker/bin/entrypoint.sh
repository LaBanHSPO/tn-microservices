echo "starting worker daemons..."
celery worker -A tasks --loglevel=info
