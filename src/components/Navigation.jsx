import React, { useEffect, useState } from 'react'
import axios from '../constants/axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigation = useNavigate()
  const [isAuth,setIsAuth] = useState(false)
  useEffect(() => {
    const accesstoken = localStorage.getItem('access_token')
    if (accesstoken !== null) {
      setIsAuth(true)
    }
  },[isAuth])

  const userlogout = ()=> {
    const refresh = localStorage.getItem('refresh_token')
    try {
      axios.post('auth/logout/',{
        refresh_token:refresh
      },
      {
        headers:{
          'Content-Type': 'application/json'
        }
      }
    
    )
    localStorage.clear()
    axios.defaults.headers.common['Authorization'] = null
    navigation('/login')
    } catch (e) {
      console.log('logout not working', e)
    }
    
}
  return (
    <div>
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Movies App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/">home</Nav.Link>
          {
            !isAuth ?
            <Nav.Link as={Link} to="/register">Register</Nav.Link>:
            ''
          }

          {
            isAuth ?
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>:
            ''
          }
          {
            isAuth ?
            <Nav.Link as={Link} to="/movies">Movies</Nav.Link>:
            ''
          }

          {
            isAuth ?
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>:
            ''
          }
         

          
          {
            isAuth ? 
            <Nav.Link onClick={userlogout}>logout</Nav.Link>:
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          }
         
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Navigation