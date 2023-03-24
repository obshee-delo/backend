# Environment preparation for non-docker deployment.

# System preparations:

sudo -s

apt update

# Node.js environment installation:

apt install nodejs

apt install npm

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

source ~/.bashrc

nvm install stable

nvm use stable

npm i -g npx @nestjs/cli typescript ts-node

npm i

# PostgreSQL installation:

apt install postgresql postgresql-contrib

systemctl start postgresql.service

psql -f queries/init.sql

# Project preparations and deployment:

npm run script:dotenv

npm run script:queries

npm run build

npm run start:prod
