
check:
	sh -c "rm -f schema.py"
	cp -f ../app/dao/status_enum.py status_enum.py
	cp -f ../app/dao/schema.py t.py
	sh -c "sed 's/.status_enum/status_enum/g' t.py > schema.py"
	sh -c "rm -f t.py"
	alembic stamp head

gen:
	@read -p "Enter Migration Name: " mg_name; \
	alembic revision --autogenerate -m $$mg_name

commit:
	alembic upgrade head
	sh -c "rm -f schema.py status_enum.py"

down:
	@read -p "Enter Down Revision: " revision; \
	alembic downgrade $$revision
	sh -c "rm -f schema.py status_enum.py"
