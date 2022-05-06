# Helpugee API

## Setup Local Project

First use `npm install` to install dependencies. Then

* use `npm run build` to build with TSC or
* use `npm run start` to start the project with nodemon or
* use `npm run dev` to start a development server with nodemon or
* use `test` to run tests 

## Development Enviroment

* Ubuntu 20.04.3 LTS
* Node v14.18.1
* NPM 8.1.3
* TSC v3.8.3

## Used Packages

* bcrypt `npm i bcrypt && npm i -D @types/bcrypt`
* cors  `npm i cors && npm i -D @types/cors`
* dotenv `npm i dotenv`
* express `npm i express && npm i -D @types/express`
* express-http-context `npm i express-http-context`
* jsonwebtoken `npm i jsonwebtoken && npm i -D @types/jsonwebtoken`
* express-jwt `npm i express-jwt && npm i -D @types/express-jwt`
* nodemon `npm i -D nodemon`
* pg `npm i pg pg-promise && npm i -D @types/pg`
* winston `npm i winston express-winston`
* jest `npm i -D jest ts-jest @types/jest`
* supertest `npm i -D supertest @types/supertest`
* eslint `npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`

## Express/Linux

To run the Docker container under `localhost:3030` use:
```bash
npm test
sudo docker build -f Dockerfile . --tag backend-helpugee
sudo docker run -p 3030:3030 -e IP=0.0.0.0 -e PORT=3030 backend-helpugee:latest
```

To enter the Docker container use:
```bash
sudo docker container list
sudo docker exec -it <container id> sh
```

## API Testing

* RESTer - Mozilla Firefox Browser Plug-In
* Postman [https://www.postman.com/downloads/](download)

### First API Tests

#### Test Entries of the Dummy Database

id, username, password, hashed password
```
1 smeier pw123456 $2b$10$xQS7qUg1SMH1yuCnaldOUuyIW/BYslnQyyU8EjhOS0b6XnKeqomjK
2 ukeller pw321654 $2b$10$gvygRocM5fecYOReq.gSWOC6NNikbnJMlmuuo0m.Q04btbw3uqF6C
```

#### Test 1

Request:
```
[GET] http://localhost:3030/user
```

Response:
```
[Status 200 OK]
[
    {
        "id": 1,
        "username": "smaier",
        "password": "$2b$10$xQS7qUg1SMH1yuCnaldOUuyIW/BYslnQyyU8EjhOS0b6XnKeqomjK",
        "forename": "Sepp",
        "surname": "Maier",
        "email": "maier@blablamail.com",
        "isActive": true,
        "isDeleted": false
    },
    {
        "id": 2,
        "username": "ukeller",
        "password": "$2b$10$gvygRocM5fecYOReq.gSWOC6NNikbnJMlmuuo0m.Q04btbw3uqF6C",
        "forename": "Ulli",
        "surname": "Keller",
        "email": "keller@blablamail.org",
        "isActive": true,
        "isDeleted": false
    }
]
```


