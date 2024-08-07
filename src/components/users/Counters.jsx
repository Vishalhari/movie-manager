import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeFork, faTicket } from '@fortawesome/free-solid-svg-icons';
import '../css/Counters.css';


const Counters = ({genre,movies}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="card-counter primary">
            <FontAwesomeIcon icon={faCodeFork} />
            <span className="count-numbers">{movies}</span>
            <span className="count-name">Movies</span>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card-counter danger">
            <FontAwesomeIcon icon={faTicket} />
            <span className="count-numbers">{genre}</span>
            <span className="count-name">Genre</span>
          </div>
        </div>

        

        
      </div>
    </div>
  )
}

export default Counters