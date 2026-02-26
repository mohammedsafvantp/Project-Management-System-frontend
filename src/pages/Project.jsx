import React, { useEffect, useState } from 'react'
import { getallProjectAPI } from '../services/allAPI'
import ProjectCard from '../components/ProjectCard'
import Add from '../components/Add'
import Header from '../components/Header'


function Projects() {

  const [projects,setProjects]=useState([])
  
  useEffect(() => {
    
  getProjects()
    
  }, [])

  const getProjects=async()=>{

    const token=sessionStorage.getItem("token")

    if(token){
      const reqHeader ={
        "contenr-text":"application/json",
        "Authorization":`Bearer ${token}`
      }
    
    try{

      const result =await getallProjectAPI(reqHeader)
      console.log(result);
      setProjects(result.data)
      

    }
    catch(err){
      console.log(err);
      

    }
  }
  }
  
  return (
    <>
    <Header/>
    <Add/>
    <div >      
        <h1 className='text-danger fw-bold text-center' style={{fontFamily:'Roboto Slab'}}>All Projects</h1>              
        </div>

        <div className='row ps-4'>
          {projects?.length>0?
          projects.map(pro=>(
          <div className='col-lg-3' >
            <div className='me-5'><br />
              <ProjectCard project={pro} />

            </div>

          </div>
  ))
          :
          <div className='text fw-bold mt-5'>No Projects Found</div>
          }

        </div>
        
       

    
    </>
  )
}

export default Projects