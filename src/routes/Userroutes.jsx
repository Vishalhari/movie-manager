import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from '../components/Home'
import Logins from '../components/users/Logins'
import Register from '../components/users/Register'
import Dashboard from '../components/Dashboard'
import Movies from '../components/Movies'
import Moviedetails from '../components/Moviedetails'
import Profile from '../components/users/Profile'

const Userroutes = () => {
  return (
    <div>
    <Routes>
    <Route path='/' Component={Home} />
    <Route path='login' Component={Logins} />
    <Route path='profile' Component={Profile} />
    <Route path='register' Component={Register} />
    <Route path='dashboard' Component={Dashboard} />
    <Route path='movies' Component={Movies} />
    <Route path='moviedetails/:id' Component={Moviedetails} />
    </Routes>
    </div>
  )
}

export default Userroutes