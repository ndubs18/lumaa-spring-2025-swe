export type Task = {
  id?: number,
  title: string,
  description: string | null,
  isComplete: boolean
}

export type SetTasks = (tasks: Task[]) => void;
