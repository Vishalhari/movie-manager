import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import axios from '../constants/axios'
import Button from 'react-bootstrap/Button';


import Navigation from './Navigation'

const Home = () => {
  const [data,Setdata] = useState([])

  useEffect(() => {
    axios.get('auth/approvalmovies/')
    .then((res) => {
      if(res.status == 200){
        Setdata(res.data)
      }
    })
  },[data])
  return (
    <div>
    <Navigation />
    <br/>
    <div className='container mt-5'>
      <div className="row">
      {
        data.map((item,index) => (
          <div className="col-md-3" key={index}>
            <div className="card">
              <img src={item.banner} 
              style={{height:284}}
              className="card-img-top" 
              alt="Card Image 1" />
              <div className="card-body">
                <h5 
                style={{'font-size':12}}
                className="card-title">{item.title}</h5>
                <span class="badge text-bg-secondary">{item.genre.title}</span>
                <div class="rating-row" itemprop="aggregateRating" itemscope 
                  itemtype="http://schema.org/AggregateRating">
                  <a class="icon" href="https://www.imdb.com/title/tt7126948/" title="IMDb 
                      Rating" target="_blank">
                      <img src="https://yts.mx/assets/images/website/logo-imdb.svg" alt="IMDb Rating" />  
                  </a>
                  <span itemprop="ratingValue">{item.imdbrating}</span>
                  <span class="hidden-xs icon-star"></span>
               </div>
               <br/>

               <Link to={`moviedetails/${item.id}`}>
               <Button 
               type='Button' 
               variant="primary"
               >Details</Button>
               </Link>
               
              
         
              
              </div>
            </div>
          </div>
        ))
      }
      </div>
    </div>

    </div>
  )
}

export default Home