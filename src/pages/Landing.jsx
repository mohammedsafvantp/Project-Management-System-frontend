import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { getHomeProjectAPI } from '../services/allAPI'
import ProjectCard from '../components/ProjectCard'


function Landing() {

    const [homeProjects,setHomeProjects]=useState([])
 const navigate=useNavigate()

  useEffect(() => {
    
    getHomeProjects()
  
    
  }, [])

   const getHomeProjects=async()=>{
    try{

      const result =await getHomeProjectAPI()
      console.log(result);
      setHomeProjects(result.data)
      
      

    }
    catch(err){
      console.log(err);
      

    }

  }

  const handleProject=async()=>{
    
    if(sessionStorage.getItem("token")){
      navigate('/project')
    }
    else{
      toast.warning("please login to explore more projects")
    }
  }
  return (
   
    <>
 <Header/>
         <div className='d-flex align-items-center justify-content-between'>
                <div className='m-5'>
                  <h1 className='text-bold'>Best <br />Project <br />Management</h1>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis dolorum sit iusto pariatur, cum dolorem eveniet officia, ullam vitae labore temporibus aperiam! At impedit veniam aspernatur alias reprehenderit, laudantium beatae?</p>

                   {
          sessionStorage.getItem("token") ?
            <Link to={'/project'}>  <button className='btn btn-success rounded'>Mange Your Projects</button>
</Link>
:
                  <Link to={'/register'}><button className='btn btn-dark rounded'>GET STARTED</button></Link>
                   }
                </div>
                <div className='mb-3'>
                    <img src="https://thumbs.dreamstime.com/b/back-end-development-cartoon-illustration-depicting-developer-working-computer-vibrant-creative-workspace-389319209.jpg" alt="" />
                </div>
            </div>

              <div>
        <h1 className='text-center mb-5' style={{fontFamily:"Courgette"}}>Explore Our Projects</h1>
        <marquee>
            <div className='d-flex'>
              { homeProjects?.length>0&&
                homeProjects?.map(pro=>(
                 <div className='me-5'>
                    <ProjectCard project={pro}/>
                </div>
                ))
             }
            </div>
        </marquee>
  <div className='text-center mt-4'>
            <button onClick={handleProject} className='btn btn-link'>Click here to View more Project</button>

  </div>
    </div>
      
    </>
  )
}

export default Landing