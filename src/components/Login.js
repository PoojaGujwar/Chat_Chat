import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({setUser}) {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [loginSuccess,setLoginSuccess] = useState('')

    const handleLogin =async(e)=>{
      e.preventDefault()
        try{
            const {data}= await axios.post(`https://chat-chat-if63.onrender.com/auth/login`,{username,password})
            setUser(data)
            console.log(data) 
        }
        catch(error){
            console.error(error.response?.data?.message|| "Error logging in")
            setLoginSuccess(error.response?.data?.message||"Error logging in")
        }
        finally{
          setTimeout(()=>{
setLoginSuccess('')
          },2000)
        }
    }

  return (
    <div className='card py-5 text-center'>
        <div className='card-body px-5'>
        <h2>Login</h2>
        <p>Login with your credentials to continue.</p>
        {loginSuccess&& <p>{loginSuccess}</p>}
        <form onSubmit={handleLogin}>
        <input type='text'
        placeholder='username'
        value={username}
        className='form-control mt-3'
        onChange={(e)=>setUsername(e.target.value)}
        />
        <input
        type="password"
        placeholder='password'
        value={password}
        className='form-control mt-3'
        onChange={(e)=>setPassword(e.target.value)}
        />
        <button className='btn btn-success mt-3'>Login</button>
        </form>
        </div>
    </div>
    
  )
}
