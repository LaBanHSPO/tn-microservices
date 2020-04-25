cleanfiles:
	find . -name \*.pyc -delete
	find . -name \*__pycache__ -delete
	find . -name \*~ -delete

install:
	pipenv install --dev

shell:
	pipenv shell

lint:
	flake8 __main__.py app/*

lint/fix:
	autopep8 --global-config .flake8 --in-place --aggressive --recursive .

test:
	python -m pytest --cov=app ./tests/unit/ -vv --cov-report term-missing
