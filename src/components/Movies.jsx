import React, { useEffect, useState } from 'react'
import axios from '../constants/axios'


import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

import Navigation from './Navigation'

const Movies = () => {
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
    const initaleditformdata = {
      id:'',
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
    const [add,Setadd] = useState(false)
    const [edit,Setedit] = useState(false)
    const [del,Setdel] = useState(false)
    const [Addfrm,Setaddfrm] = useState(initalformdata)
    const [Editdata,Seteditdata] = useState(initaleditformdata)
    const [genre,SetGenre] = useState([])
    const [movies,Setmovies] = useState([]);
    const [Selectedfile,Setselectedfile] = useState(null)


    const Handleclose = () => {
        Setadd(false)
    }

    const HandlecloseEdit = () => {
      Setedit(false)
    }

    const handleDelclose = () => {
      Setdel(false)
    }

    const HandleAddmodal = () => {
        Setadd(true)
    }

    const HandleEditmodal = (movie) => {
      Setedit(true)
      try {
        axios.get(`auth/moviedetails/${movie.id}`)
        .then((res) => {

          if(res.status == 200){
            Seteditdata(res.data) 
          }
        })
      } catch (error) {
        toast.error("Unable To Fetch Details",{
          position:'bottom-center'
        });
      }
    }

    const Handledeletemodal = (movie) => {
      Setdel(true)
      Seteditdata(movie)
    }



    const handleinputadd = (e) => {
        const {name,value} = e.target
        Setaddfrm({
            ...Addfrm,
            [name]:value
        })
    }

    const HandleinputUpd = (e) => {
      const {name,value} = e.target
     Seteditdata({
      ...Editdata,
      [name]:value
     })
    }


    const HandlefileAdd = (e) => {
        const file = e.target.files[0]
        const Fileform = new FormData();
        Fileform.append("title",Addfrm.title)
        Fileform.append("genre",Addfrm.genre)
        Fileform.append("users",Addfrm.users)
        Fileform.append("description",Addfrm.description)
        Fileform.append("releaseDate",Addfrm.releaseDate)
        Fileform.append("actors",Addfrm.actors)
        Fileform.append("imdbrating",Addfrm.imdbrating)
        Fileform.append("trailerLink",Addfrm.trailerLink)
        Fileform.append("approval_status",Addfrm.approval_status)
        Fileform.append("banner",file)
        Setaddfrm(Fileform)
    }

    const HandlefileEdit = (e) => {
      const file = e.target.files[0]
      Setselectedfile(file)
    }

    const ListGenres = () => {
      try {
        axios.get('auth/genrelist/')
            .then((res) =>{
                if (res.status == 200) {
                    SetGenre(res.data)
                }
        })
      } catch (error) {
        toast.error("Unable To Fetch Genre",{
          position:'bottom-center'
        });
      }
    }

    const movieslist = (page,pageSize) => {
      const params = new URLSearchParams({
        users: userid
      }).toString();
      try {
        axios.get('auth/usermovies?'+params)
        .then((res) => {
          if(res.status == 200){
            Setmovies(res.data)
          }
        })
      } catch (error) {
        toast.error("Unable To Fetch Movie list",{
          position:'bottom-center'
        });
      }
    }

    useEffect(() => {
      ListGenres()
      movieslist()
    },[])

    const Handlesubmit = (e) => {
      e.preventDefault();
      try {
        axios.post('auth/moviecreate/',Addfrm,{
          headers:{
            "Content-Type": "multipart/form-data"
          }
        })
        .then((res) => {
          Setaddfrm(initalformdata)
          Setadd(false)
          movieslist()
          toast.success("Movies Successsfully Added",{
            position:'bottom-center'
        });
        })
      } catch (error) {
        toast.error("Unable To create Movie",{
          position:'bottom-center'
        });
      }

    }

    const Handleupdate = async(e) => {
      e.preventDefault();

      const Formdateupd = new FormData();
      Formdateupd.append("title",Editdata.title)
      Formdateupd.append("genre",Editdata.genre)
      Formdateupd.append("users",Editdata.users)
      Formdateupd.append("description",Editdata.description)
      Formdateupd.append("releaseDate",Editdata.releaseDate)
      Formdateupd.append("actors",Editdata.actors)
      Formdateupd.append("imdbrating",Editdata.imdbrating)
      Formdateupd.append("trailerLink",Editdata.trailerLink)
      Formdateupd.append("approval_status",Editdata.approval_status)
      if(Selectedfile){
        Formdateupd.append("banner",Selectedfile)
      }

    
      try {
        await axios.put(`auth/moviesupdate/${Editdata.id}/`,Formdateupd)
        .then((res) => {
          console.log(res)
          if(res.status==200){
            Seteditdata(initaleditformdata)
            Setedit(false)
            toast.success("Movies updated Successsfully",{
              position:'bottom-center'
          });

          }
        })

      } catch (error) {
        toast.error("Unable To create Movie",{
          position:'bottom-center'
        });
      }
      
    }

    const Handledelete = () => {
      try {
        axios.delete(`auth/moviesdelete/${Editdata.id}/`)
        .then((res) => {
          if(res.status == 204){
            Setdel(false)
            Seteditdata([])
            movieslist()
            toast.success("Movies Deleted Successsfully",{
              position:'bottom-center'
          });
          }
        })
      } catch (error) {
        toast.error("Unable To Delete Movie",{
          position:'bottom-center'
        });
      }
    }

    
  return (
    <div>
    <Navigation />
    <br/>
    <div className='container'>
    <Button 
    type='submit' 
    variant="primary"
    onClick={HandleAddmodal}
    >Add Movies</Button>
    </div>

    <div className='container mt-5'>
      <div className="row">
      {
        movies.map((item,index) => (
          <div className="col-md-3" key={index}>
          <div className="card">
            <img src={item.banner} 
            style={{height:319}}
            className="card-img-top" 
            alt="Card Image 1" />
            <div className="card-body">
              <h5 
              style={{'font-size':17}}
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
              {
                item.approval_status ===1 ?
                ( <span className="badge bg-success">Approved</span>):
                (<span className="badge bg-warning">Pending</span>)
              }
              <br/>
              <Button 
              type='Button' 
              variant="primary"
              onClick={() => HandleEditmodal(item)}
              >Edit</Button>
              <Button 
              type='Button' 
              variant="danger"
              onClick={() => Handledeletemodal(item)}>Delete</Button>
               </div>
          </div>
        </div>
        ))
      }
      </div>
    </div>



    <Modal show={add} onHide={Handleclose}>
    <Modal.Header closeButton>
      <Modal.Title>Add Movie</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={Handlesubmit}>
      <Form.Group className="mb-3" controlId="formemployeename">
        <Form.Label>Movie Title</Form.Label>
        <Form.Control 
        type="text" 
        name='title'
        onChange={handleinputadd}
        value={Addfrm.title}
        placeholder="Enter Movie Title" 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formemployeename">
        <Form.Label>Genre</Form.Label>
        <Form.Select name="genre" 
        onChange={handleinputadd}
        aria-label="Default select example">
        <option>Select Genre</option>
        {
            genre.map((item,index) => (
                <option value={item.id} key={index}>{item.title}</option>
            )
                
            )
        }
        </Form.Select>
    </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control 
        as="textarea" 
        name='description'
        onChange={handleinputadd}
        rows={3}
         />
         {Addfrm.description}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formemployeename">
        <Form.Label>Release Date</Form.Label>
        <Form.Control 
        type="date" 
        name='releaseDate'
        onChange={handleinputadd}
        value={Addfrm.releaseDate}
        placeholder="Enter Release Date" 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formemployeename">
        <Form.Label>Actors</Form.Label>
        <Form.Control 
        type="text" 
        name='actors'
        onChange={handleinputadd}
        value={Addfrm.actors}
        placeholder="Enter Actors" 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formemployeename">
        <Form.Label>IMDB Rating</Form.Label>
        <Form.Control 
        type="text" 
        name='imdbrating'
        onChange={handleinputadd}
        value={Addfrm.imdbrating}
        placeholder="Enter Actors" 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formemployeename">
        <Form.Label>Trailer</Form.Label>
        <Form.Control 
        type="text" 
        name='trailerLink'
        onChange={handleinputadd}
        value={Addfrm.trailerLink}
        placeholder="Enter Trailer Link" 
        />
      </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label className='float-start'>Banner</Form.Label>
        <Form.Control 
        type="file"
        name='banner'
        onChange={HandlefileAdd}

        />

</Form.Group> 
<Button type='submit' variant="primary">Add</Button>
    </Form>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary"
    onClick={Handleclose}>
    Close
  </Button>
    </Modal.Footer>
  </Modal>


  <Modal show={edit} onHide={HandlecloseEdit}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Movie</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={Handleupdate}>
      <Form.Group className="mb-3" controlId="formemployeename">
        <Form.Label>Movie Title</Form.Label>
        <Form.Control 
        type="text" 
        name='title'
        onChange={HandleinputUpd}
        value={Editdata.title}
        placeholder="Enter Movie Title" 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMovieGenre">
        <Form.Label>Genre</Form.Label>
        <Form.Select name="genre" 
        onChange={HandleinputUpd}
        value={Editdata.genre}
        aria-label="Default select example">
        <option>Select Genre</option>
        {
            genre.map((item,index) => (
                <option value={item.id} key={index}>{item.title}</option>
            )
                
            )
        }
        </Form.Select>
    </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control 
        as="textarea" 
        name='description'
        onChange={HandleinputUpd}
        rows={3}
        value={Editdata.description}
         />
         
      </Form.Group>

      <Form.Group className="mb-3" controlId="formemployeename">
        <Form.Label>Release Date</Form.Label>
        <Form.Control 
        type="date" 
        name='releaseDate'
        onChange={HandleinputUpd}
        value={Editdata.releaseDate}
        placeholder="Enter Release Date" 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formemployeename">
        <Form.Label>Actors</Form.Label>
        <Form.Control 
        type="text" 
        name='actors'
        onChange={HandleinputUpd}
        value={Editdata.actors}
        placeholder="Enter Actors" 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formemployeename">
        <Form.Label>IMDB Rating</Form.Label>
        <Form.Control 
        type="text" 
        name='imdbrating'
        onChange={HandleinputUpd}
        value={Editdata.imdbrating}
        placeholder="Enter Actors" 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formemployeename">
        <Form.Label>Trailer</Form.Label>
        <Form.Control 
        type="text" 
        name='trailerLink'
        onChange={HandleinputUpd}
        value={Editdata.trailerLink}
        placeholder="Enter Trailer Link" 
        />
      </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label className='float-start'>Banner</Form.Label>
        <Form.Control 
        type="file"
        name='banner'
        onChange={HandlefileEdit}
        />
        <br/>
        {Editdata && (
          <img src={Editdata.banner} style={{ width:100 }} />
        )

        }
</Form.Group> 
<Button type='submit' variant="primary">Update</Button>
    </Form>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary"
    onClick={HandlecloseEdit}>
    Close
  </Button>
    </Modal.Footer>
  </Modal>


  <Modal show={del} onHide={handleDelclose}>
    <Modal.Header closeButton>
      <Modal.Title>Delete Movie</Modal.Title>
    </Modal.Header>
    <Modal.Body>

    <p>Are you sure to Remove {Editdata.title}   ?</p>

    </Modal.Body>
    <Modal.Footer>
    <Button type='submit' 
    variant="primary"
    onClick={Handledelete}
    
    >Submit</Button>
    <Button 
    variant="secondary"
    onClick={handleDelclose}>
    Close
  </Button>
    </Modal.Footer>
  </Modal>



    </div>
  )
}

export default Movies