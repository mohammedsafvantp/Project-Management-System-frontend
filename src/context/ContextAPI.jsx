import React, { createContext, useState } from 'react'

export const addProjectResponseContext=createContext()

export const editProjectResponseContext=createContext()

export const tokenAuthenticationContext=createContext()

function ContextAPI({children}) {
    const [addResponse,setAddResponse]=useState({})


    const[isAuthorized,setAutherized]=useState(sessionStorage.getItem("token"))
  return (
    <>


<tokenAuthenticationContext.Provider value={{isAuthorized,setAutherized}}>
     <addProjectResponseContext.Provider value={{addResponse,setAddResponse}}>
        {children}
        </addProjectResponseContext.Provider>
</tokenAuthenticationContext.Provider>

    

    </>
  )
}

export default ContextAPI