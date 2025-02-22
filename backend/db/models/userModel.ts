import pool from '../config.ts'

export type UserDto = {
  id: number,
  username: string,
  password: string
}

export const createNewUser = async (username: string, password: string) => {
  const result = await pool.query("INSERT INTO users (username, password) VALUES ($1,$2) RETURNING username", [username, password])
  return result;
}

export const findUser = async (username: string) => {
  const result = await pool.query("SELECT * FROM USERS WHERE username = $1", [username])
  return result;


}
