
import { ToastContainer } from 'react-toastify'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Project from './pages/Project'
import Auth from './pages/Auth'
import Pnf from './components/pnf'



function App() {

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} theme="colored" />
      <Routes>
        <Route path={'/'} element={<Landing />} />
        <Route path={'/login'} element={<Auth/>} />
        <Route path={'/register'} element={<Auth insideRegister={true} />} />
        <Route path={'/project'} element={<Project/>}/>
        <Route path={'/*'} element={<Pnf/>} />

      </Routes>

    </>
  )
}

export default App
