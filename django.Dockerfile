FROM python:3-slim
COPY . .
RUN pip install -r requirements.txt
RUN python manage.py migrate
RUN python manage.py getsupervisordata
ENTRYPOINT ["python", "manage.py", "runserver", "0:8000"]