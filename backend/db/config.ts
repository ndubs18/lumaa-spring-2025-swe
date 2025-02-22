import pg from 'pg'
import path from 'path'
import dotenv from 'dotenv'

const { Pool, Client } = pg
const __dirname = path.resolve();

dotenv.config({
  override: true,
  path: path.join(__dirname, '../.env'),
})

//connection string
//<username>:<password>@<server_hostname>:<port>/<database>.
const connectionString = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const pool = new Pool({
  connectionString
});



export default pool
