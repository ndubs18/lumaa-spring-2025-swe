import TaskForm from './TaskForm'
import TaskList from './TaskList'
import type { Task } from '../types';
import { useEffect, useState } from 'react';

let style = {
  container: {
    width: '90vw',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    gap: '20rem'
  },
  heading: {
    textAlign: 'center' as 'center'
  },
  logoutButton: {
    width: '100%',
    textAlign: 'right' as 'right',
  }
}

let Dashboard = ({ logoutHandler }: { logoutHandler: () => void }) => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const setTasksWrapper = (tasks: Task[]) => {
    setTasks(tasks);
  }
  const getTasks = async () => {
    try {
      let result = await fetch('/api/tasks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      let tasks = await result.json();
      setTasks(tasks)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTasks();
  }, [])
  return (<>
    <p style={style.logoutButton} onClick={logoutHandler}>Logout</p >
    <h1 style={style.heading}> Dashboard </h1>
    <div style={style.container}>
      <TaskForm tasks={tasks} setTasks={setTasksWrapper} />
      <TaskList tasks={tasks} setTasks={setTasksWrapper} />
    </div>
  </>
  )
}

export default Dashboard;
