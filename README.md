## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```



## Criacao do banco de dados localmente
```
#127.0.0.1
#3306
# root
# orange-juice


$ docker run --name orange-juice -p 3306:3306 -e MYSQL_ROOT_PASSWORD=orange-juice -d mysql

```