import { useState } from 'react'
let AuthForm = ({ onLogin }: { onLogin: () => void }) => {
  const [error, setError] = useState();

  let signUpHandler = async (formData: FormData) => {
    const username = formData.get('username');
    const password = formData.get('password');

    const credentials = { username: username, password: password };
    let result = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    let data = await result.json();
    if (data.error) {
      setError(data.message)
    }
    console.log(result)
  }

  const loginHandler = async (formData: FormData) => {

    const credentials = { username: formData.get('username'), password: formData.get('password') };
    let result = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    let data = await result.json()
    if (data.token) {
      onLogin()
      localStorage.setItem('token', data.token);
    }
    else if (data.error) {
      setError(data.message);
    }

  }
  const styles = {
    form: {
      width: 'fit-content',
      padding: '1rem',
      margin: '0 auto',
      position: 'relative' as 'relative',
      top: '10rem',
      textAlign: 'center' as 'center'
    },
    heading: {
      width: '100%',
      textAlign: 'center' as 'center'
    }
  }
  return (
    <>
      <h1 style={styles.heading}>Register/Log In</h1>
      <form style={styles.form} action={signUpHandler}>
        <label htmlFor='username'>Enter in your username:</label><br />
        <input type='username' id='username' name='username'></input><br />
        <label htmlFor='password'>Enter a password:</label><br />
        <input type='password' id='password' name='password'></input><br />
        <button formAction={signUpHandler}>Register</button>
        <button formAction={loginHandler}>Log in </button>
        {error ? error : ' '}
      </form>
    </>
  )
}
export { AuthForm }
