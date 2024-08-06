import React, { useEffect, useState } from 'react'
import axios from '../constants/axios'
import Navigation from './Navigation'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Reviews from './Reviews'
import ReviewsList from './ReviewsList'
import YoutubeIframe from './YoutubeIframe';

const Moviedetails = () => {
    const userid  = localStorage.getItem('userId')
    const initalformdata = {
        title:'',
        genre:'',
        users:userid,
        description:'',
        releaseDate:'',
        actors:'',
        imdbrating:'0.0',
        trailerLink:'',
        approval_status:0
    }

    const [data,Setdata] = useState()
    const [isAuth,setIsAuth] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        const accesstoken = localStorage.getItem('access_token')
        const Fetchmoviedetails = async() => {
            try {
                await axios.get(`auth/moviedetaillist/${id}`)
                .then((res) => {
                    if(res.status == 200){
                        Setdata(res.data)
                    }
                })
            } catch (error) {
                console.error('Failed to fetch movie details:', error)
            }
        }

        if (accesstoken !== null) {
            setIsAuth(true)
          }

        Fetchmoviedetails()
    },[id,isAuth])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };


    if(!data){
        return <div>Loading...</div>
    }



    
  return (
    <div>
    <Navigation />
    <div className='container'>
    {data && (
        <div>
        <div class="row">
            <div class="col-md-10">
                <div class="card">
                    <img src={data.banner} class="card-img-top" alt="Image Title" />
                    <div class="card-body">
                        <h5 class="card-title">{data.title}</h5>
                        <p class="card-text">{data.description}</p>
                        <span class="badge text-bg-secondary">{data.genre.title}</span>
                        <br/>
                        <div class="rating-row" itemprop="aggregateRating" itemscope 
                            itemtype="http://schema.org/AggregateRating">
                            <a class="icon" href="https://www.imdb.com/title/tt7126948/" title="IMDb 
                                Rating" target="_blank">
                                <img src="https://yts.mx/assets/images/website/logo-imdb.svg" alt="IMDb Rating" />  
                            </a>
                            <span itemprop="ratingValue">{data.imdbrating}</span>
                            <p><b>Released Date:</b> {formatDate(data.releaseDate)}</p>

                            <YoutubeIframe videoid={data.trailerLink} />
                           
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    
    </div>
    )}
    </div>
    {
        isAuth ?
        <Reviews movieid={id} />:
        <p>Login To add Review 
        <Link to='/login'>Login</Link>
        </p>
    }
   
    <ReviewsList movieid={id} />

    </div>

  )
}

export default Moviedetails