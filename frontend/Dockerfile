
FROM python:3.10-slim-bullseye

WORKDIR /app

COPY . /app 

RUN pip install --no-cache-dir flask

EXPOSE 3000

CMD ["python", "app.py"]