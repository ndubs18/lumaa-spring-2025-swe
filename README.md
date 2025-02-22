# Lumaa Full Stack Challenge

Demo link: [https://drive.google.com/file/d/1MN_odtW7IFQ3xjoFNzj7hN-iwrjgvNjS/view?usp=sharing]()

Thank you for taking the time to review my submission, I look forward to hearing back soon.

Salary expectations per month: $2,400

## Frontend

We spun this up with **Vite** but without all of the config files we have a basicg folder structure:

    ├── backend //server and db code
    ├── index.html
    ├── public
    ├── src //front end

1. Navigate to the root of the project and run ``npm install``
2. ``npm run dev`` should start our frontend on `http://localhost:5173`

## Backend

1. Open another terminal session and navigate to `/backend` folder
2. Execute the command `npm install`

#### Env variables

3. Edit the template.env file to match your db credentials and change the
   the filename from `example.env` to `.env`

| Key         |        Value        |
| ----------- | :-----------------: |
| DB_USERNAME | {your_db_username} |
| DB_PASSWORD | {your_db_password} |
| DB_HOST     | {your_db_hostnmane} |
| DB_PORT     |   {your_db_port}   |
| DB_NAME     |   {your_db_name}   |
| SECRET_KEY  |  {HSA_256_secret}  |

#### Database (PostgreSQL)

**Connection String:** `postgres://{username}:{password}@{host}:{port}/{dbname}`

4. Connect to your database with a postgres client (pgAdmin 4, psql, etc) using your credential or connection string provided above
5. To initialize the tables that we need in the database, we need to execute a couple of queries against it:

   Create users table:

   ```
   CREATE TABLE IF NOT EXISTS users (
   id SERIAL PRIMARY KEY,
   username VARCHAR(100) UNIQUE NOT NULL,
   password VARCHAR NOT NULL)
   ```

   Create tasks table:

   ```
   CREATE TABLE IF NOT EXISTS tasks (
   id SERIAL PRIMARY KEY,
   title VARCHAR NOT NULL,
   description VARCHAR,
   isComplete BOOLEAN DEFAULT false)
   ```

### Running backend

6. Execute command `npm run start` and the server should start on `http://localhost:3000`
7. Now we should have a functional app! Open your browser and navigate to the frontend url `http://localhost:5173`

## Aside

- Our backend start with the `--experimental-strip-types flag`. This is a feature of `Node v22.6` which allows us to develop and run our typescript without compiling with every change we make
