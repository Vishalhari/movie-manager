import React, { useEffect, useState } from 'react'
import axios from '../constants/axios'
import Navigation from './Navigation'
import Counters from './users/Counters'

import { toast } from 'react-toastify';


const Dashboard = () => {
  const userId  = localStorage.getItem('userId')
    const [User,Setuser] = useState([])
    const userid = localStorage.getItem('userId')
    const [Genre,setgenre] = useState(0)
    const [Movies,setmovies] = useState(0)

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
      Genrelist()
      Movieslist()
    },[])


    const Genrelist = () => {
      axios.get('auth/genrelist/')
      .then((res) => {
        if(res.status == 200){
          setgenre(res.data.length)
        }
      })
    }

    const Movieslist = () => {
      const params = new URLSearchParams({
        users: userid
      }).toString();
      try {
        axios.get('auth/usermovies?'+params)
        .then((res) => {
          if(res.status == 200){
           setmovies(res.data.length)
          }
        })
      } catch (error) {
        toast.error("Unable To Fetch Movie list",{
          position:'bottom-center'
        });
      }
    }


  return (
    <div>
    <Navigation />
    <h3>Welcome {User.first_name } {User.last_name }</h3>

    <Counters genre={Genre} movies={Movies} />
    </div>
  )
}

export default Dashboard