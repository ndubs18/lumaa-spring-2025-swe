import { Task, SetTasks } from '../types.ts'
let TaskForm = ({ tasks, setTasks }: { tasks: Task[], setTasks: SetTasks }) => {
  const newTaskHandler = async (formData: FormData) => {
    const newTask: Task = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      isComplete: false
    }
    try {
      let result = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newTask)
      })
      let data = await result.json();
      newTask.id = data.id;
      setTasks([...tasks, newTask])
      console.log(result)
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className="taskForm">
      <h2>Create a new task</h2>
      <form action={newTaskHandler}>
        <label htmlFor='title'> Name of task?</label><br />
        <input type='text' id='title' name='title' required /><br />
        <label htmlFor='description'>What is the task?</label><br />
        <input type='textArea' id='description' name='description' required /><br />
        <input type='submit' />
      </form>
    </div>

  )

}

export default TaskForm;
