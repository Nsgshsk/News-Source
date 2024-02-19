# News Source

## Описание

Уеб приложение, което извлича новинарски статии от различни новинарски сайтове с помощта на **RSS** ленти

## Инсталация на нужни библиотеки

### Нужни езици

- Python>=3.12
- Node.js>=20.11 LTS
- PostgreSQL>=16

### Backend

1.Отидете в папката ***backend/news_source_backend***

2.Изпълнете следната команда

> pip install -r requirements.txt

### Database

След, като инсталирате PostgreSQL и терминалната му програма (те се инсталират заедно), изпълнете следната команда

> pg_restore -h localhost -p 5432 -U postgres -W -c -C database.sql

Ако трябва, променете някои от параметрите в командата.

### Frontend

1. Отидете в ***frontend/news-source-frontend***

2. Изпълнете следната команда

> npm install

## Инструкции за пускане

1. Пуснете сървъра с базата данни

2. Пуснете backend сървъра

> python manage.py runserver 8000

3. Пуснете frontend сървъра

> ng serve --port 4200

4. Влезте в сайта през http://localhost:4200
