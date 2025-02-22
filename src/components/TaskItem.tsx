import { useState, useEffect } from "react"
import { Task, SetTasks } from "../types";

let TaskItem = ({ taskInfo, tasks, setTasks }: { taskInfo: Task, tasks: Task[], setTasks: SetTasks }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    setIsChecked(taskInfo.isComplete)
  }, [])
  const deleteTaskHandler = async () => {
    let result = await fetch(`/api/tasks/${taskInfo.id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id: taskInfo.id }),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (result.status == 204) {
      let newTaskList = tasks.filter(task => {
        return taskInfo.id !== task.id;
      })
      setTasks([...newTaskList]);
      console.log(result);
    }
    else {
      console.log("There was an issue deleting the item");
    }

  }

  const changeTaskStatusHandler = async () => {
    let result = await fetch(`/api/tasks/${taskInfo.id}`, {
      method: 'PUT',
      body: JSON.stringify({ id: taskInfo.id, title: taskInfo.title, description: taskInfo.description, isComplete: !isChecked }),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (result.status == 204) {
      let newTasks = tasks.map(task => {
        if (task.id == taskInfo.id) {
          return { ...taskInfo, isComplete: !isChecked }
        }
        return task;
      })
      setTasks(newTasks);
    }
    setIsChecked(!isChecked);
    console.log(result);

  }


  const editTaskHandler = async (formData: FormData) => {
    let taskToChange = {
      id: taskInfo.id,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      isComplete: taskInfo.isComplete
    }
    let result = await fetch(`/api/tasks/${taskInfo.id}`, {
      method: 'PUT',
      body: JSON.stringify(taskToChange),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (result.status == 204) {

      editToggleHandler();

      let newTasks = tasks.map(task => {
        if (task.id == taskInfo.id) {
          return { ...task, title: taskToChange.title, description: taskToChange.description, isComplete: taskInfo.isComplete };
        }
        return task;
      })

      setTasks(newTasks);
    }
    console.log(result);
  }

  const editToggleHandler = () => {
    setEditing(!editing);
  }

  const styles = {
    delete: {
      color: 'red'
    }
  }

  return (
    <li key={taskInfo.id}>
      {!editing ? (<>
        <div className='title'>Title: {taskInfo.title}<input type='checkbox' checked={isChecked} onChange={changeTaskStatusHandler}></input></div>
        <div className='description'>Desc: {taskInfo.description}</div>
        <div className='update'><div style={styles.delete} onClick={deleteTaskHandler}>Delete</div><div onClick={editToggleHandler}>Edit</div></div> </>) : (
        <form action={editTaskHandler}>
          <input type='text' name='title' defaultValue={taskInfo.title} />
          <input type='text' name='description' defaultValue={taskInfo.description ? taskInfo.description : ' '} />
          <button type='submit'>save</button><button onClick={editToggleHandler}>Cancel</button>
        </form>
      )

      }
    </li>
  )
}

export default TaskItem;
