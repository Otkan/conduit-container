FROM python:3.6-slim AS build

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip wheel --no-cache-dir --wheel-dir /wheels -r requirements.txt

FROM python:3.6-slim

ENV PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=conduit.settings

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends libpq5 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /wheels /wheels
RUN pip install --no-cache-dir /wheels/*

COPY . .

EXPOSE 8000

CMD ["gunicorn", "conduit.wsgi:application", "--bind", "0.0.0.0:8000"]