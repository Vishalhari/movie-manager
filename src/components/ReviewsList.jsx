import React, { useEffect, useState } from 'react'
import axios from '../constants/axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';


const ReviewsList = ({movieid}) => {
    const [reviews,Setreviews] = useState([])


    useEffect(() => {
        const params = new URLSearchParams({
            movie: movieid
          }).toString();
        axios.get('auth/reviewslist?'+params)
        .then((res) => {
            if(res.status == 200){
                Setreviews(res.data)
            }
        })
    },[])


    // const renderStars = (rating) => {
    //     console.log(rating)
    //     let stars = [];
    //     for (let i = 0; i < 5; i++) {
    //         if (rating >= 1) {
    //             stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'gold' }} />);
    //         } else if (rating >= 0.5) {
    //             stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} style={{ color: 'gold' }} />);
    //         } else {
    //             stars.push(<FontAwesomeIcon key={i} icon={faStarEmpty} style={{ color: 'gold' }} />);
    //         }
    //         rating--;
    //     }
    //     return stars;
    // };

    const renderStars = (rating) => {
        // Ensure rating is within 0 to 5
        rating = Math.max(0, Math.min(5, rating)); console.log(rating)
    
        // Calculate number of full stars and empty stars
        const fullStars = Math.floor(rating);  console.log(fullStars)
        const emptyStars = 5 - fullStars; console.log(emptyStars)
    
        let stars = [];
    
        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} style={{ color: 'gold' }} />);
        }
    
        // Add empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStarEmpty} style={{ color: 'white' }} />);
        }
    
        return stars;
    };
    

    const timeAgo = (timestamp) => {
        const now = new Date();
        const then = new Date(timestamp);
        const diffInSeconds = (now - then) / 1000;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);

        if (diffInHours < 1) {
        if (diffInMinutes < 1) {
            return 'Just now';
        } else if (diffInMinutes === 1) {
            return '1 minute ago';
        } else {
            return `${diffInMinutes} minutes ago`;
        }
    } else if (diffInHours === 1) {
        return '1 hour ago';
    } else {
        return `${diffInHours} hours ago`;
    }

        
    }

    
  return (
    <div className="container">
    <h2 className="text-center">Bootstrap 4 User Rating Form / Comment Form</h2>
    
    <div className="card">
        <div className="card-body">
        {
            reviews.map((item,index) => (
                <div className="row">
                    <div className="col-md-2">
                        <img 
                            src="https://image.ibb.co/jw55Ex/def_face.jpg" 
                            className="img img-rounded img-fluid" 
                            alt="User Avatar"
                        />
                        <p className="text-secondary text-center">{timeAgo(item.created)}</p>
                    </div>
                    <div className="col-md-10">
                        <p>
                            <a 
                                className="float-left" 
                                href="https://maniruzzaman-akash.blogspot.com/p/contact.html"
                            >
                                <strong>{item.UserId.first_name} {item.UserId.last_name}</strong>
                            </a>
                            <span className="float-right" style={{ marginLeft: '39em' }}>
                                {renderStars(item.rating)}
                            </span>
                        </p>
                        <div className="clearfix"></div>
                        <p>
                           {item.review}
                        </p>
                        
                    </div>
                    <hr/>
            </div>
            ))
        }
            
           
        </div>
    </div>
</div>
  )
}

export default ReviewsList