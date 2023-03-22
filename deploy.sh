# Non-docker solution for deployment.

apt update

apt install node

apt install npm

apt install postgresql postgresql-contrib

systemctl start postgresql.service

npm install -g npx nest typescript ts-node

npm run script:dotenv

npm run script:queries

psql -f queries/init.sql

npm run build

npm run start:prod
