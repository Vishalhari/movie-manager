import React, { useState } from 'react'
import axios from '../constants/axios'
import Starrating from './Starrating'

import { toast } from 'react-toastify';

import './css/ratings.css';

const Reviews = ({movieid}) => {
    const initalformdata = {
      rating:0,
      review:'',
  }
    const [rating,Setrating] = useState(0)
    const [reviewVisible,SetreviewVisible] = useState(false)
    const [formData,setformdata] = useState(initalformdata)
    const userid  = localStorage.getItem('userId')
    const ShowReviewbox = () => {
      SetreviewVisible(true)
    }
    const Handleinput = (e) => {
      const {name,value} = e.target
      setformdata({
        ...formData,
        [name]:value
      })
    }

    const handleRatingChange = (rating) => {
      setformdata((prev) => ({
        ...prev,
        rating:rating,
      }))
    }

    const Handlesubmit = (e) => {
      e.preventDefault();

      try {
        axios.post(`auth/movies/${movieid}/reviews/user/${userid}/`,formData)
        .then((res) => {
          if(res.status == 201){
            Setrating(0)
            setformdata(initalformdata)
            SetreviewVisible(false)
            toast.success("Movies Review Successsfully Added",{
              position:'bottom-center'
          });
          }
        })
      } catch (error) {
        toast.error("Unable To Add Movie Review",{
          position:'bottom-center'
        });
      }
    }
  return (
    <div>
      <div className='container'>
        <div className='row' style={{ marginTop: '40px' }}>
          <div className='col-md-6'>
            <div className="well well-sm">
              <div className="text-right">
                <button 
                className="btn btn-success btn-green"
                onClick={ShowReviewbox}>
                Leave a Review
                </button>
              </div>
              <br/>
              {
                reviewVisible && (
                  <div className='row' id="post-review-box">
                    <div className='col-md-12'>
                     <form onSubmit={Handlesubmit}>
                        <input type='hidden' id="ratings-hidden" value={rating} />
                        <textarea 
                        className="form-control animated" 
                        cols="50" id="new-review"
                        name="review" 
                        placeholder="Enter your review here..." 
                        value={formData.comment}
                        onChange={Handleinput}
                        rows="5" />
                        <div className="text-right">
                          <Starrating 
                          rating={formData.rating} setRating={handleRatingChange} />
                          <button 
                          className="btn btn-danger btn-sm"
                          style={{ marginRight: '10px' }} >
                          <span className="glyphicon glyphicon-remove"></span>Cancel
                          </button>
                          <button className="btn btn-success btn-lg"
                          type='submit'>
                          Save
                          </button>
                        </div>
                     </form>

                    </div>
                  </div>
                )
              }
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews