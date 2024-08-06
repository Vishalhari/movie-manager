import React, { useState } from 'react'
import axios from '../../constants/axios';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigation from '../Navigation';
import { toast } from 'react-toastify';

function Register() {
    const initalformdata = {
        first_name:'',
        last_name:'',
        email:'',
        username:'',
        password:'',
        password2:''
    }
    const navigation = useNavigate()
    const [Formdata,Setformdata] = useState(initalformdata)
    const HandleInput = (e) => {
        const {name,value} = e.target
        Setformdata({
            ...Formdata,
            [name]:value
        })
    }
    const handlesubmit = async(e) => {
        e.preventDefault();
        try {
            await axios.post('auth/register/',Formdata)
            .then((res) => {
                if(res.status == 201){
                    Setformdata(initalformdata)
                    toast.success("User Successsfully Registered",{
                        position:'bottom-center'
                    });
                    navigation('/login')
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
    <Navigation />
    <div className='container shadow' style={{width:'30%',marginBottom:50}}>
    <h3>Registration</h3>
        <Form onSubmit={handlesubmit}>
            <Form.Group className="mb-3" controlId="formname">
                <Form.Label className='float-start'>First Name</Form.Label>
                <Form.Control 
                type="text"  
                name='first_name'
                value={Formdata.first_name}
                onChange={HandleInput}
                placeholder="Enter first Name"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formname">
                <Form.Label className='float-start'>Last Name</Form.Label>
                <Form.Control 
                type="text"  
                name='last_name'
                value={Formdata.last_name}
                onChange={HandleInput}
                placeholder="Enter Last Name"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formemail">
                <Form.Label className='float-start'>Email</Form.Label>
                <Form.Control 
                type="text"  
                name='email'
                value={Formdata.email}
                onChange={HandleInput}
                placeholder="Enter Email"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formusername">
            <Form.Label className='float-start'>Username</Form.Label>
            <Form.Control 
            type="text"  
            name='username'
            value={Formdata.username}
            onChange={HandleInput}
            placeholder="Enter Username"
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formpassword">
            <Form.Label className='float-start'>Password</Form.Label>
            <Form.Control 
            type="password"  
            name='password'
            value={Formdata.password}
            onChange={HandleInput}
            placeholder="Enter Password"
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formpassword">
            <Form.Label className='float-start'>Confirm Password</Form.Label>
            <Form.Control 
            type="password"  
            name='password2'
            value={Formdata.password2}
            onChange={HandleInput}
            placeholder="Enter Password"
            />
            </Form.Group>
            <Button type='submit' variant="primary">Register</Button>
        </Form>
        <p style={{paddingBottom:20,paddingLeft:100,}}>
        <b>have an account</b>
        <Link to='/login'>Login</Link>
        </p>
    </div>
    </div>
  )
}

export default Register