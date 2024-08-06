import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from '../constants/axios'
import Button from 'react-bootstrap/Button';


import Navigation from './Navigation'
import Searchfilter from './Searchfilter';

import { toast } from 'react-toastify';

const Home = () => {
  const navigation = useNavigate()
  const [data,Setdata] = useState([])
  const [genre,setGenre] = useState('')
  const [releaseDate,SetreleaseDate] = useState('')
  const [Moviename,Setmoviename] = useState('')
  const [filtereddata,SetfilteredData] = useState([])

  const handleFilter = () => {
    // console.log('Original Data:', data);
    // console.log('Filter Conditions - Genre:', genre, 'Release Date:', releaseDate, 'Movie Name:', Moviename);

    const result = data.filter(movie => {
      const year = movie.releaseDate.split('-')[0];

      const matchGenre = !genre || movie.genre.id == genre;
      const matchReleaseDate = !releaseDate || year == releaseDate;
      const matchMovieName = !Moviename || movie.title.toLowerCase().includes(Moviename.toLowerCase());

      return matchGenre && matchReleaseDate && matchMovieName
    })

    SetfilteredData(result)



  }



  useEffect(() => {
   

    try {
      axios.get('auth/approvalmovies/')
      .then((res) => {
        if(res.status == 200){
          Setdata(res.data)
          SetfilteredData(res.data)
        }
      })
    } catch (error) {
      console.log(error)
    }
    
  },[])


  return (
    <div>
    <Navigation />
    <br/>
    <div className='container mt-5'>
      <div className="row">
      <Searchfilter 
      genre={genre}
      setGenre={setGenre}
      releaseDate={releaseDate}
      SetreleaseDate={SetreleaseDate}
      Moviename={Moviename}
      Setmoviename={Setmoviename}
      handleFilter={handleFilter}
      />
      {
        filtereddata.map((item,index) => (
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