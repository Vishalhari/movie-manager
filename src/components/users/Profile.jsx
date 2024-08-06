import React, { useEffect, useState } from 'react'
import axios from '../../constants/axios'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigation from '../Navigation';
import { toast } from 'react-toastify';




const Profile = () => {
    const initalformdata = {
        first_name:'',
        last_name:'',
        email:'',
        username:'',
        password:'',
        password2:''
    }
    const [User,Setuser] = useState(initalformdata)
    
    const userid = localStorage.getItem('userId')

    const HandleInput = (e) => {
        const {name,value} = e.target
        Setuser({
            ...User,
            [name]:value
        })
    }

    const fetchUserData = async() => {
        try {
            await axios.get(`auth/userdetails/${userid}`)
            .then((res) => {
                if(res.status == 200){
                    Setuser(res.data)
                }
            })
        } catch (error) {
            toast.error("Unable To Fetch Details",{
                position:'bottom-center'
            });
        }
    }

    const HandleUpdate = (e) => {
        e.preventDefault();

        try {
            axios.put(`auth/profileupdate/${userid}/`,User)
            .then((res) => {
                if(res.status ==200){
                    fetchUserData()
                    toast.success("User Updated Successsfully ",{
                        position:'bottom-center'
                    });
                }

            })
        } catch (error) {
            toast.error("Unable to update User",{
                position:'bottom-center'
            })
        }

    }

    useEffect(() => {
        fetchUserData()
        
    },[])
  return (
    <div>
    <Navigation />

     <div className='container shadow' style={{width:'30%',marginBottom:50}}>
    <h3>Profile</h3>
        <Form onSubmit={HandleUpdate}>
            <Form.Group className="mb-3" controlId="formname">
                <Form.Label className='float-start'>First Name</Form.Label>
                <Form.Control 
                type="text"  
                name='first_name'
                value={User.first_name}
                onChange={HandleInput}
                placeholder="Enter first Name"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formname">
                <Form.Label className='float-start'>Last Name</Form.Label>
                <Form.Control 
                type="text"  
                name='last_name'
                value={User.last_name}
                onChange={HandleInput}
                placeholder="Enter Last Name"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formemail">
                <Form.Label className='float-start'>Email</Form.Label>
                <Form.Control 
                type="text"  
                name='email'
                value={User.email}
                onChange={HandleInput}
                placeholder="Enter Email"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formusername">
            <Form.Label className='float-start'>Username</Form.Label>
            <Form.Control 
            type="text"  
            name='username'
            value={User.username}
            onChange={HandleInput}
            placeholder="Enter Username"
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formpassword">
            <Form.Label className='float-start'>Password</Form.Label>
            <Form.Control 
            type="password"  
            name='password'
            onChange={HandleInput}
            placeholder="Enter Password"
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formpassword">
            <Form.Label className='float-start'>Confirm Password</Form.Label>
            <Form.Control 
            type="password"  
            name='password2'
            onChange={HandleInput}
            placeholder="Enter Password"
            />
            </Form.Group>
            <Button type='submit' variant="primary">Update</Button>
        </Form>
        
    </div>
    </div>
  )
}

export default Profile