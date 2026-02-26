import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import SERVER_URL from '../services/server_url';




function ProjectCard({project}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     <div>
         <Card  className=''>
      <Card.Img onClick={handleShow} variant="top" height={200} src={`${SERVER_URL}/uploads/${project?.projectImg}`} />
      <Card.Body>
        <Card.Title className='text-center text-dark' >{project?.title}</Card.Title>
          <div >
            <h5><span style={{fontSize:'15px',color:"brown"}}>{project?.overview}</span></h5>
          <h5>Languages : <span style={{color:"brown"}}>{project?.language}</span></h5>
          
          </div>
             <Link to={project?.github}>
            <button variant="secondary" onClick={handleClose} className='px-5 btn btn ' style={{backgroundColor:"black"}}>
              <i class="fa-brands fa-github text-light"></i>
            </button>
         </Link>
      </Card.Body>
    </Card>
     </div>

    
    </>
  )
}

export default ProjectCard
