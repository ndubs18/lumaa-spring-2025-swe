import pool from '../config.ts'

export type TaskDto = {
  id?: number,
  title: string,
  description: string,
  isComplete: boolean
};

export const createNewTask = async (title: string, description: string) => {
  try {
    const result = await pool.query("INSERT INTO tasks (title, description) VALUES ($1,$2) RETURNING id", [title, description]);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export const getAllTasks = async () => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id");
  return result;
}

export const removeTask = async (id: number) => {
  const result = await pool.query("DELETE FROM TASKS WHERE id = $1 RETURNING id", [id])
  return result;
}

export const changeStatusOfTask = async (id: number, isComplete: boolean) => {
  const result = await pool.query("UPDATE tasks SET iscomplete = $1 WHERE id = $2 RETURNING id", [isComplete, id])
  return result;
}

export const editTask = async (task: TaskDto) => {

  const result = await pool.query("UPDATE tasks SET title = $1, description = $2, iscomplete = $3 WHERE id = $4 RETURNING id", [task.title, task.description, task.isComplete, task.id])
  console.log(result);
  return result;
}
