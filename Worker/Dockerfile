FROM python:3.6-slim

RUN groupadd user && useradd --create-home --home-dir /home/user -g user user

WORKDIR /home/user
USER user

RUN pip install --upgrade pip
RUN pip install pipenv

ADD Pipfile* ./
RUN pipenv install --system --skip-lock

ADD . .

RUN chmod +x ./bin/entrypoint.sh
CMD [ "./bin/entrypoint.sh" ]
