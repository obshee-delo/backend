# Инсталляция

## Без контейнеризации

Подготовка среды:

```
# Необходимо для локализации команд от имени администратора
sudo -s

# Обновление регистра
apt update

# Установка среды
apt install node

# Установка пакетного менеджера
apt install npm

# Установка СУБД
apt install postgresql-15 postgresql-contrib

# Запуск СУБД
systemctl start postgresql.service

# Установка глобальных пакетов
npm install -g npx nest typescript ts-node

# Генерация .env файла
npm run generate:dotenv
```

Подготовка базы данных:

```
# Переключение на пользователя СУБД
sudo -i -u postgres

# Переключение в REPL СУБД
psql

# Создание базы данных
CREATE DATABASE api;

# Изменение пароля пользователя
ALTER USER postgres PASSWORD 'odsolutions';

# Выход из REPL СУБД
CTRL + Z (^Z)

# Переключение на администратора
exit
```

Запуск сервера:

```
npm run start:prod
```

Запуск сервера с откладкой:

```
npm run start:dev
```

## С контейнеризацией

(В данный момент в разработке)

Подготовка среды:

```
# Необходимо для локализации команд от имени администратора
sudo -s

# Обновление регистра
apt-get update

# Установка docker
apt-get remove docker docker-engine docker.io containerd runc
apt-get update
apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Подготовка базы данных:

```
# Запуск контейнера СУБД
docker-compose up postgres -d

# ...
```

Запуск сервера:

```
docker-compose up api -d
```

# Поддержка

[Telegram](https://t.me/ncfax)
