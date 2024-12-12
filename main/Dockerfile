FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы приложения в контейнер
COPY . .

# Открываем порт 3000
EXPOSE 4444

# Запускаем приложение
CMD ["npm", "run", "build"]