# Базовый образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем проект
COPY . .

# Сборка фронтенда
RUN npm run build

# Сервируем собранные файлы
RUN npm install -g serve
CMD ["serve", "-s", "dist"]
