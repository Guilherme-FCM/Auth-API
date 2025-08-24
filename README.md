<h1 align="center">{ Auth-API }</h1>
<p align="center">🔐 Node.js API for users authentication</p>

<p align="center">
    <a href="#about">About</a> |
    <a href="#installations">Installations</a> |
    <a href="#how-to-use">How to Use</a> | 
    <a href="#documentation">Documentation</a> | 
    <a href="#technologies">Technologies</a> | 
    <a href="#license">License</a>
</p>

## 😁**About**
This application was created for frontend developers that need create, delete, update and authenticate users on your app. With this API, you can remove the responsability of code a backend for these features, using simple routes in Auth-API.

## 👨‍💻**Installations**
To use this API, it's require install in your computer:
- [Node & NPM](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)

## 🚀**How to Use**
1. Copy the file "[.env.example](./.env.example)" to new file named ".env" and configure your database credentials

2. Execute the commands below in project directory to use this API in your computer:
~~~bash
# Run Docker
docker compose up --build

# Runing in http://localhost:3333/
~~~

## 📄**Documentation**
| Method | Resource          | Description                            |
| ------ | ----------------- | -------------------------------------- | 
| GET    | /users            | Get all users                          |
| GET    | /users/{username} | Get one user                           |
| POST   | /users            | Create a user                          |
| PUT    | /users            | Modify a authenticated user            |
| DELETE | /users            | Delete a authenticated user            |
| POST   | /authenticate     | Authenticate a user                    |
| PUT    | /password         | Modify a authenticated user's password |

## ✨**Technologies**
- [Node.js](https://nodejs.org/en/docs/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/docs/)

## ⚖**License**
This project is under the license [MIT](./LICENSE).

### Made by [Guilherme Feitosa](https://github.com/Guilherme-FCM/).
