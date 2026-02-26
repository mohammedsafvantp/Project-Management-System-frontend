import React, { useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'
import { toast } from 'react-toastify'


function Auth({ insideRegister }) {

    const [userData, setUserData] = useState({ name: "", email: "", password: "" })
    console.log(userData);

    const [logedIn, setLogedIn] = useState(false)

    const navigate = useNavigate()
    const handleRegister = async () => {
        const { name, email, password } = userData
        if (name && email && password) {
            try {

                const result = await registerAPI(userData)
                console.log(result);
                if (result.status == 200) {
                    toast.success(`welcome ${result.data.name}...please login to explore our site `)
                    navigate('/login')
                    setUserData({ name: "", email: "", password: "" })
                }
                else {
                    if (result.status == 406) {
                        toast.error(result.response.data)
                        setUserData({ name: "", email: "", password: "" })
                    }
                }


            }
            catch (err) {
                console.log(err);


            }
        }
        else {
            toast.warning("fill the form completely")
        }

    }
    const handleLogin = async () => {

        if (userData.email && userData.password) {

            try {

                const result = await loginAPI(userData)
                console.log(result);
                if (result.status == 200) {

                    sessionStorage.setItem("user", JSON.stringify(result.data.user))
                    sessionStorage.setItem("token", result.data.token)
                    setLogedIn(true)
                    setTimeout(() => {

                        setUserData({ name: "", email: "", password: "" })
                        navigate('/')
                        setLogedIn(false)

                    }, 3000);
                    setAutherized(true)
                }
                else {
                    if (result.status == 404) {
                        toast.error(result.response.data)
                        setUserData({ name: "", email: "", password: "" })
                    }
                }


            }
            catch (err) {
                console.log(err);


            }

        }
        else {
            toast.warning("enter email and password")
        }
    }
    return (
        <div>
            <Header />
            <div style={{ minHeight: '70vh', }}>
                <div className='border rounded shadow m-5 ' style={{ backgroundColor: '' }}>
                    <Row>
                        <Col lg={6} md={6} sm={12}>
                            <img className='m-4 img-fluid' src="https://img.freepik.com/vecteurs-libre/illustration-du-concept-connexion_114360-739.jpg" alt="" width={500} />
                        </Col>
                        <Col lg={6} md={6} sm={12}>

                            <h2 style={{ fontFamily: "Courgette" }} className='text-white'><i class="fa-brands fa-docker text-white ms-5 mt-5"></i> Project Fair</h2>
                            <p className='text-white'>Sign {insideRegister ? 'Up' : 'In'} To Your Account</p>

                            {
                                insideRegister &&
                                <div className='mb-2 me-5'>
                                    <input onChange={(e) => setUserData({ ...userData, name: e.target.value })} value={userData.name} type="text" placeholder='UserName' className='form-control' />
                                </div>}
                            <div className='mb-2 me-5'>
                                <input onChange={(e) => setUserData({ ...userData, email: e.target.value })} value={userData.email} type="text" placeholder='Email Address' className='form-control' />
                            </div>
                            <div className='mb-2 me-5'>
                                <input onChange={(e) => setUserData({ ...userData, password: e.target.value })} value={userData.password} type="text" placeholder='Password' className='form-control' />
                            </div>

                            <div className='me-5'>
                                {
                                    insideRegister ?
                                        <button onClick={handleRegister} className='btn w-100 text-light bg-success'>Sign Up</button> :
                                        <button onClick={handleLogin} className='btn w-100 text-light  bg-success'>Sign In</button>
                                }
                            </div>
                            {
                                insideRegister ?
                                    <p className='mt-2'>Already have an account? <Link to={'/login'}> Login</Link></p> :
                                    <p className='mt-2'>Don't  have an account? <Link to={'/register'}>Register</Link></p>}

                        </Col>
                    </Row>
                </div> <br />
            </div>
        </div>
    )
}

export default Auth