import React, { useContext, useState } from 'react'
import { UserContext } from './UserContex';
import { Navigate } from 'react-router-dom';

export default function Login() {
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [redirect , setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);


    async function login(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login',{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-type': 'application/json'},
            credentials: 'include'
        })
        if(response.ok){
            response.json().then(userinfo => {
                setUserInfo(userinfo)

                setRedirect(true)
                alert('Logged In Successfully')

            })
        }
        else{
            alert('Wrong Credentials')
        }


    }
if(redirect){
    return(
        <Navigate to={'/'}/>
    )
}

  return (
    <div>
      <form onSubmit={login}>
        <h1>---Login Form---</h1>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter Your Name"
          value={username}
          onChange={(ev)=> setUsername(ev.target.value)}
          
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(ev)=> setPassword(ev.target.value)}
        
        />
        
        <button>Login</button>
      </form>
    </div>
  )
}
