import { useEffect } from 'react'
import TaskItem from './TaskItem'
import type { Task, SetTasks } from '../types';

let TaskList = ({ tasks, setTasks }: { tasks: Task[], setTasks: SetTasks }) => {
  const getTasks = async () => {
    try {
      let result = await fetch('/api/tasks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      let tasks = await result.json();
      setTasks(tasks)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      getTasks();
    }
  }, [])

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => {
          return <TaskItem key={task.id} taskInfo={task} tasks={tasks} setTasks={setTasks} />
        })
        }
      </ul>
    </div>
  )
}

export default TaskList;
