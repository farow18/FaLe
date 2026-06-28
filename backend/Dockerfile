FROM python:3.10-slim

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir flask flask-cors flask-sqlalchemy werkzeug pymysql

EXPOSE 5000

CMD [ "python", "app.py" ]