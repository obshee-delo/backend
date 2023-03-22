# Развертка

## Без контейнеризации

Подготовка среды:

```
# Необходимы права супер-пользователя.
./env.sh
```

Запуск:

```
./start.sh
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

# Инициализация средств базы данных
docker exec -u postgres pg_test psql postgres postgres -f queries/init.sql
```

Запуск сервера:

```
docker-compose up api -d
```

# Поддержка

[Telegram](https://t.me/ncfax)
