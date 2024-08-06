import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';


const Starrating = ({ rating, setRating }) => {
    const [hoverRating,SetHoverRating] = useState(0)

    useEffect(() => {
        SetHoverRating(rating)
    },[rating])

  return (
    <div className="stars starrr" data-rating={rating}>
    {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={hoverRating >= star ? 'glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty'}
          onMouseEnter={() => SetHoverRating(star)}
          onMouseLeave={() => SetHoverRating(rating)}
          onClick={() => setRating(star === rating ? 0 : star)}
        >
        <FontAwesomeIcon icon={hoverRating >= star ? faStar : faStarEmpty} />
        </span>
      ))}
    </div>
  )
}

export default Starrating