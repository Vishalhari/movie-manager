import React, { useEffect, useState } from 'react'
import axios from '../constants/axios'

import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

const Searchfilter = ({genre,setGenre,releaseDate,SetreleaseDate,Moviename,Setmoviename,handleFilter}) => {
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    const years = [];

    const [Genrelist,Setgenrelist] = useState([])

    for (let i = currentYear; i >= startYear; i--) {
        years.push(i);
      }

    useEffect(() => {
        try {
            axios.get('auth/genrelist/')
            .then((res) => {
                if(res.status == 200){
                    Setgenrelist(res.data)
                }
            })
        } catch (error) {
            toast.error("Unable To Fetch Genre",{
                position:'bottom-center'
            });
        }
    },[])
  return (
    <div>
      <Form onSubmit={(e) => { e.preventDefault(); handleFilter(); }}>
        <div className="form-row">
            <div className="col-md-4 mb-3">
                <label htmlFor="genre">Genre</label>
                <select className="form-control" id="genre" value={genre}
                onChange={(e) => setGenre(e.target.value)}
                >
                <option value="">Select Genre</option>
                {
                    Genrelist.map((item,index) => (
                        <option value={item.id}>{item.title}</option>
                    ))
                }
                </select>

            </div>
            <div className="col-md-4 mb-3">
                <label htmlFor="releaseDate">Release Date</label>
                <select className="form-control" id="releaseDate" value={releaseDate}
                onChange={(e) => SetreleaseDate(e.target.value)}
                >
                    <option value="">Select Release Date</option>
                    {
                        years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))
                    }
                </select>
            </div>
            <div className="col-md-4 mb-3">
                <label htmlFor="moviename">Movie Name</label>
                <br/>
                <input type='text' placeholder='Movie Name' name='moviename' value={Moviename}
                onChange={(e) => Setmoviename(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Search</button>
        </div>

      </Form>
    </div>
  )
}

export default Searchfilter