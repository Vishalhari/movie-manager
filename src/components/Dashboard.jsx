import React, { useEffect, useState } from 'react'
import axios from '../constants/axios'
import Navigation from './Navigation'


const Dashboard = () => {
    const [User,Setuser] = useState([])
    const userid = localStorage.getItem('userId')

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`auth/userdetails/${userid}/`)
          Setuser(response.data)
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      fetchUserData();
    },[])
  return (
    <div>
    <Navigation />
    <h3>Welcome {User.first_name } {User.last_name }</h3>
    </div>
  )
}

export default Dashboard