
check:
	alembic stamp head

gen:
	cp -f ../app/dao/schema.py schema.py
	@read -p "Enter Migration Name: " mg_name; \
	alembic revision --autogenerate -m $$mg_name \

commit:
	alembic upgrade head

down:
	@read -p "Enter Down Revision: " revision; \
	alembic downgrade $$revision \
