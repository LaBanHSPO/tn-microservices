FROM celery:4.0.2
COPY --chown=user:user . /home/user/
WORKDIR /home/user/
RUN chmod +x ./bin/entrypoint.sh
CMD [ "./bin/entrypoint.sh" ]
