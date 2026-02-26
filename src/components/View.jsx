import React, {  useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import {  getUserProjectAPI } from '../Servies/allAPI'
import { addProjectResponseContext } from '../context/ContextAPI'



function View() {

  const{addResponse}=useContext(addProjectResponseContext)

  const [userProjects,setUserProjects]=useState([])


  useEffect(() => {
    
  getUserProjects()
    
  }, [addResponse])
  

  const getUserProjects=async()=>{
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "content-type":"application/json",
        "Authorization":`Berear ${token}`

      }
      try{
        const result=await getUserProjectAPI(reqHeader)
        console.log(result);
        setUserProjects(result.data)
        

      }
      catch(err){
        console.log(err);
        

      }
    }
  }


  return (
    <>
    
      <div  className='d-flex justify-content-between'>
       <h2 className='fw-bold' style={{fontFamily:'Roboto Slab'}}>All Projects</h2>
         
       <Add />
        </div>  
        
     <div className='mt-3 col-lg-6 mb-4 w-100'>
      {userProjects?.length>0 ?  
        userProjects?.map(pro=>(  
        <div className='border border-2 border-danger p-3 rounded  d-flex align-items-center justify-content-between mt-4'>
          <h2 className='text-info'>{pro.title}</h2>
         <div className='d-flex align-items-center '> 
         <Edit  project={pro}/>
         <button className='btn'><i className="fa-brands fa-github  ms-3 fa-lg text-primary me-2"></i></button>
          </div>
          
             
        </div>
        ))
        :
        <div className='terxt-danger fw-bold mt-3'>no project added yet</div>
        }
     </div>
    </>
  )
}

export default View
