import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './SignUp.css'
const SignUp = () => {
  const nav=useNavigate()
  const [email,setEmail]=useState('')
  const [pass,setPass]=useState('')
  const [name,setName]=useState('')
  
  // const [confpass,setConfpass]=useState('')
  async function submit(e){
    e.preventDefault()
    try{
      await axios.post('http://localhost:4000/signup',{email,pass,name}).then(res=>{
        console.log(res.data)
        if(res.data==='exists'){
          alert('User already exists.')   
        }else if(res.data==='notexists'){
          localStorage.setItem('jwt', JSON.stringify('loggedin'))
          localStorage.setItem('myEmail', JSON.stringify(email))
          nav('/home')
          // nav('/home',{state:{myEmail:email}})
        }
      })
    }catch(e){
      console.log(e)
      alert('Error')
    }
  }
  return (
    <div className='container'>
      <div className='signup-container'>
        <h1 className='text-4xl font-extrabold'>Welcome</h1>
        <form action='POST'>
          <label for="name">Name</label>
          <input type='text' name='Name' id='name' placeholder='Enter name' onChange={(e)=>{setName(e.target.value)}}/>
          <label for="email">Email Address</label>
          <input type='email' name='email' id='email' placeholder='Enter email' onChange={(e)=>{setEmail(e.target.value)}}/>
          <label for="password">Password</label>
          <input name='password' type='password' id='password' placeholder='Set password' onChange={(e)=>{setPass(e.target.value)}}/>
          <small>
                    <ul>
                        <li>Use 8 or more characters</li>
                        <li>Use upper and lower case letters (e.g., aA)</li>
                        <li>Use a number (e.g., 1234)</li>
                        <li>Use a symbol (e.g., !@#)</li>
                    </ul>
          </small>
          {/* <input label='ConfirmPassword' name='confirmPassword' type='password' placeholder='Confirm password'/> */}
          <button type='submit' onClick={submit} className='signup-button'>Sign Up</button>
        </form>
        <small>By creating an account, you agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.</small>
        <div className='mt-4'>
        <span className='text-indigo-800 mt-3 font-semibold' onClick={()=>nav('/signin')}>Already have an account ?</span>
        </div>
      </div>
    </div>
  )
}

export default SignUp