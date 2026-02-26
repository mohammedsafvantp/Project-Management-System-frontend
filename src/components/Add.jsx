import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { addProjectAPI } from '../services/allAPI';



function Add() {
  const [show, setShow] = useState(false);
  const [projectDetails, setProjectDetails] = useState({ title: "", language: "", github: "", overview: "", projectImg: "" })
  console.log(projectDetails);

  const [imgFileStatus, setImgFileStatus] = useState(false)

  const [preview, setPreview] = useState("https://media.istockphoto.com/id/1021471354/vector/image-upload-icon.jpg?s=612x612&w=0&k=20&c=TBKGW7vES1EtPcaxIvCAKxXL0W9EGd5FPBWHhtC2kFg=")




  useEffect(() => {

    if (projectDetails.projectImg.type == "image/png" || projectDetails.projectImg.type == "image/jpg" || projectDetails.projectImg.type == "image/jpeg") {

      setImgFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImg))

    }
    else {
      setPreview("https://media.istockphoto.com/id/1021471354/vector/image-upload-icon.jpg?s=612x612&w=0&k=20&c=TBKGW7vES1EtPcaxIvCAKxXL0W9EGd5FPBWHhtC2kFg=")
      setImgFileStatus(false)
      setProjectDetails({ ...projectDetails, projectImg: "" })
    }

  }, [projectDetails.projectImg])


  const handleClose = () => {
    setProjectDetails({ title: "", language: "", github: "", overview: "", projectImg: "" })
    setShow(false);
  }
  const handleShow = () => setShow(true);
  const handleUpload = async () => {
    const { title, language, github, overview, projectImg } = projectDetails
    if (title && language && github && overview && projectImg) {
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("overview", overview)
      reqBody.append("projectImg", projectImg)

      const token = sessionStorage.getItem("token")
      console.log(token);

      if (token) {
        const reqHeader = {
          "content-type": "multipart/form-data",
          "Authorization": `Bearer ${token}`

        }
        try {
          const result = await addProjectAPI(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success("project added successfully")
            handleClose()
          }
          else {
            if (result.status == 406) {
              toast.error(result.response.data)
            }
          }

        }
        catch (err) {
          console.log((err));


        }
      }

    }

    else {
      toast.warning("enter the field completely")
    }
  }
  return (
    <>
      <div className='m-5'>
        <button className='btn btn-danger' onClick={handleShow}>Create new +</button>
      </div>

      <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className='text-danger fs-2'>Project Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className='row'>
            <div className='col-lg-2'>
              <label>
                <img className='img-fluid ' src={preview} alt="" style={{ width: '200px' }} />
                <input onChange={(e) => setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] })} type="file" style={{ display: 'none' }} /></label>
              {!imgFileStatus && <p className='text-warning mt-1'>*Upload image (jpg/jpeg/png) files only</p>
              }
            </div>

            <div className='col-lg-10'>
              <div className='mb-2'>
                <input onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} type="text" className='form-control' placeholder='project title' />

              </div>

              <div className='mb-2'>
                <input onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} type="text" className='form-control' placeholder='Language Used' />

              </div>
              <div className='mb-2'>
                <input onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} type="text" className='form-control' placeholder='Github Link' />

              </div>
              <div className='mb-2'>
                <textarea onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} type="text" className='form-control' placeholder='Project Overview' />

              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} className='bg-danger' variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Add