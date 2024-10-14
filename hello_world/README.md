# Примечание

### Установка БД и зависимостей

Для того чтобы можно было запустить данный проект локально, необходимо:
1) Установить локальную базу данных MongoDB (требуется 2,5 ГБ свободного места): https://www.mongodb.com/try/download/community
2) Убедиться, что установлен пакетный менеджер npm: `npm -v`
3) Установить глобально gulp-cli `npm i --global gulp-cli`
4) Запустить команду `npm i` в корне проекта и в папке `front`
5) Дополнительно: для того, чтобы удобно просматривать содержимое базы данных MongoDB, существует приложение MongoDB Compass (находится не на самом верху, поэтому надо пролистать страницу скачивания до MongoDB Compass (GUI)): https://www.mongodb.com/try/download/compass

Чтобы не качать базу данных, которая занимает много места, можно создать облачную базу MongoDB, однако сейчас есть проблемы с данным подходом, потому что работать база будет только за рубежом.

### Запуск

Для запуска сервера в режиме отладки используется команда `npm run start`, для обычного запуска - `npm run build`. По умолчанию порт: `4444`.

Для запуска клиента, в папке `front` используется команда `gulp`. По умолчанию порт `3000`.

Ссылка на видео: https://disk.yandex.ru/i/KQZQjkwABMsELQ