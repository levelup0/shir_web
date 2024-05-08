# Для запуска frontend небходимо запускать команду
- Первым мы должны перейти в папку frontend

С начало делаем build
<code>
- docker build -t 701cc17e35af .
</code>

Потом уже запускаем на нужную порт
<code>
- docker run -d -p 3000:3000 frontend-frontend
</code>
Далее не забываем этот же ip прописать в nginx

- После коммита и пуш проект
- Находим frondent и удаляем потом уже
<code>
- docker build -t frontend . --no-cache
- docker run -d -p 3000:3000 frontend
</code>
