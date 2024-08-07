import React, { useState } from 'react'
import axios from '../../constants/axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigation from '../Navigation';

const Logins = () => {
  const initalformdata = {
    'username':'',
    'password':''
  }

  const navigation = useNavigate()
  const [Formdata,Setformdata]= useState(initalformdata)

  const HandleInput = (e) => {
    const {name,value} = e.target
    Setformdata({
      ...Formdata,
      [name]:value
    })
  }  

  const Handlesubmit = async(e) => {
    e.preventDefault();

    try {
      await axios.post('auth/login/',Formdata,{
        headers:{
          'Content-Type':'application/json'
        },
      },
    )
      .then((res)=> {
        if(res.status == 200){
          localStorage.clear()
          localStorage.setItem('access_token',res.data.access)
          localStorage.setItem('refresh_token',res.data.refresh)
          localStorage.setItem('userId',res.data.id)
          axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`
         navigation('/dashboard')
        }
      })
    } catch (error) {
      toast.success("Username/Password Incor",{
        position:'bottom-center'
    });
    }
  }

  return (
    <div>
    <Navigation />
    <div className='container shadow' style={{width:'30%',marginBottom:50}}>
    <h3>Login</h3>
        <Form onSubmit={Handlesubmit}>
            <Form.Group className="mb-3" controlId="formusername">
            <Form.Label className='float-start'>Username</Form.Label>
            <Form.Control 
            type="text"  
            name='username'
            onChange={HandleInput}
            value={Formdata.username}
            placeholder="Enter Username"
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formpassword">
            <Form.Label className='float-start'>Password</Form.Label>
            <Form.Control 
            type="password"  
            name='password'
            onChange={HandleInput}
            value={Formdata.password}
            placeholder="Enter Password"
            />
            </Form.Group>
            <Button type='submit' variant="primary">Login</Button>
        </Form>
        <p style={{paddingBottom:20,paddingLeft:100,}}>
        <b>Don't have an account</b>
        <Link to='/'>Register</Link>
        </p>
    </div>
    </div>
  )
}

export default Logins