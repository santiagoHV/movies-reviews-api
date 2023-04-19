# MOVIE REVIEWS REST API

This is a REST API that allows the management of reviews and movie ratings, through a user system that allows you to create movies collaboratively with the approval of administrator users.

This project works with express.js, using the ORM sequalize connected to a postgreSQL database.




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`DB_HOST`
`DB_USER`
`DB_PASSWORD`
`DB_PORT`
`DB_NAME`
`DB_TEST`
`JWT_SECRET`



## Run Locally

Clone the project

```bash
  git clone https://github.com/santiagoHV/movies-reviews-api.git
```

Go to the project directory

```bash
  cd movies-reviews-api
```

Install dependencies

```bash
  npm install
```

Create a database and set the name in env variable `DB_NAME`

Start the server

```bash
  npm run dev
```


## Running Tests

Create a database and set the name in env variable `DB_TEST`

To run tests, run the following command

```bash
  npm run test
```
