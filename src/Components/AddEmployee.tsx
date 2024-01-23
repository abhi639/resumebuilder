import React, {useEffect, useState} from 'react'
import './AddEmp.css'
import {Link, useHistory} from 'react-router-dom'
import camera from './camera.jpg'
import {PageTitle} from '../_metronic/layout/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import locationsData from './locations.json'
import {ToastContainer, toast} from 'react-toastify'

type Location = {
  id: number
  name: string
}

const AddEmp = () => {
  const [locations, setLocations] = useState<Location[]>([])
  const [roles, setRoles] = useState<string[]>([])
  const [managers, setManagers] = useState<{id: string; full_name: string}[]>([])

  const history = useHistory()

  useEffect(() => {
    setLocations(locationsData)
    fetchRoles()
    fetchManagers()
  }, [])

  const fetchRoles = async () => {
    try {
      const response = await Axios.get('http://localhost:8082/admin/api/roles/list')
      // Assuming the response contains an array of objects with role_name property
      const roleNames = response.data.map((role: any) => role.role_name)
      setRoles(roleNames)
    } catch (error) {
      console.error('Error fetching roles:', error)
    }
  }

  const fetchManagers = async () => {
    try {
      const response = await Axios.get('http://localhost:8082/managers')
      console.log(response.data)
      // Assuming the response contains an array of objects with role_name property
      const managers = response.data.map((manager: any) => ({
        id: manager.user_id,
        full_name: manager.full_name,
      }))

      setManagers(managers)
      console.log(managers)
    } catch (error) {
      console.error('Error fetching roles:', error)
    }
  }

  const [formData, setFormData] = useState({
    current_role: '',
    full_name: '',
    date_of_joining: '',
    email: '',
    employee_Id: '',
    gender: '',
    mobile_number: '',
    date_of_birth: '',
    role: '',
    location: '',
    managerIds: [],
  })

  const handleChange = (e: any) => {
    const {name, value} = e.target

    if (name === 'managerIds') {
      // If the selected field is 'managerIds', update it as an array with numeric values
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: [parseInt(value, 10)], // Parse the value as an integer and add it to the array
      }))
    } else {
      // For other fields, update as usual
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(formData)
    addEmployeeToBackend()
  }

  const addEmployeeToBackend = async () => {
    try {
      const response = await Axios.post('http://localhost:8082/add/employee', formData)
      console.log('Employee added successfully:', response.data)

      // Optionally, you can reset the form data or redirect to another page.
      setFormData({
        current_role: '',
        full_name: '',
        date_of_joining: '',
        email: '',
        employee_Id: '',
        gender: '',
        mobile_number: '',
        date_of_birth: '',
        role: '',
        location: '',
        managerIds: [],
        // ...other form fields
      })

      toast.success('Employee added successfully', {
        position: 'top-right',
        autoClose: 4000, // Set the duration for which the toast will be displayed
        hideProgressBar: false,
        onClose: () => {
          // Redirect to /dashboard after toast is closed
          history.push('/dashboard')
        },
      })
    } catch (error) {
      console.error('Error adding employee:', error)

      toast.error('Employee not added', {
        position: 'top-right',
        autoClose: 4000, // Set the duration for which the toast will be displayed
        hideProgressBar: false,
        onClose: () => {
          // Redirect to /dashboard after toast is closed
        },
      })
      // Handle the error, e.g., show an error message to the user.
    }
  }

  const handleEditClick = () => {
    const fileInput = document.getElementById('fileInput')
    if (fileInput) {
      fileInput.click()
    }
  }
  const handleFileInputChange = (e: any) => {
    const selectedFile = e.target.files[0]

    // Here, you can handle the selected file, e.g., display it or upload it to the server.
  }

  return (
    <>
      
        <form onSubmit={handleSubmit} className='my-form'>
          <PageTitle>Add Employee </PageTitle>

          <ToastContainer />

          <div className='row align-items-center'>
            <div className='col-md-9 mb-4'>
              <div className='mb-5'>
                <label
                  htmlFor='currentRole'
                  style={{
                    fontWeight: 'bolder',
                    fontSize: '15px',
                  }}
                  className='form-label'
                >
                  Current Role
                </label>
                <select
                  className='form-select form-select-lg'
                  id='currentRole'
                  name='current_role'
                  value={formData.current_role}
                  onChange={handleChange}
                >
                  <option value=''>Select Current Role</option>
                  {/* Map through the roles data to populate the options */}
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mb-10'>
                <label
                  style={{
                    fontWeight: 'bolder',
                    fontSize: '15px',
                  }}
                  htmlFor='fullName'
                  className='form-label'
                >
                  Full Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='fullName'
                  name='full_name'
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>
              <div className='mb-10'>
                <label
                  htmlFor='currentRole'
                  className='form-label'
                  style={{
                    fontWeight: 'bolder',
                    fontSize: '15px',
                  }}
                >
                  Application Role
                </label>
                <select
                  className='form-select form-select-lg'
                  id='application_role'
                  name='role'
                  value={formData.role}
                  onChange={handleChange} // Add this event handler
                >
                  <option value=''>Select Application Role</option>
                  <option value='manager'>Manager</option>
                  <option value='user'>Employee</option>
                </select>
              </div>
            </div>

            <div className='col-md-3 mb-4'>
              <div className='text-center'>
                <div className='camera-rectangle'>
                  <img
                    src={camera}
                    alt='Camera'
                    className='camera-icon'
                    style={{maxWidth: '100%', height: 'auto'}}
                  />
                  {/* <div className="edit-icon">
                    <FontAwesomeIcon icon={faEdit} />
                  </div> */}
                  <div className='edit-icon'>
                    <div className='edit-icon-inner' onClick={handleEditClick}>
                      <FontAwesomeIcon icon={faEdit} />
                      <input
                        type='file'
                        id='fileInput'
                        name='user_image'
                        style={{display: 'none'}}
                        onChange={handleFileInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-6'>
              <div className='mb-10'>
                <label
                  htmlFor='reportingManager'
                  className='form-label'
                  style={{
                    fontWeight: 'bolder',
                    fontSize: '15px',
                  }}
                >
                  Reporting Manager(s)
                </label>
                <select
                  className='form-select form-select-lg'
                  id='reporting_manager'
                  name='managerIds' // Update the name to 'managerIds'
                  value={formData.managerIds}
                  onChange={handleChange}
                >
                  <option value=''>Select Reporting Manager</option>
                  {/* Map through the managers data to populate the options */}
                  {managers.map((manager) => (
                    <option key={manager.id} value={manager.id}>
                      {manager.full_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='col-md-6'>
              <div className='mb-10'>
                <label
                  htmlFor='dateOfJoining'
                  className='form-label'
                  style={{
                    fontWeight: 'bolder',
                    fontSize: '15px',
                  }}
                >
                  Date Of Joining
                </label>
                <input
                  type='date'
                  className='form-control'
                  id='dateOfJoining'
                  name='date_of_joining'
                  value={formData.date_of_joining}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-6'>
              <div className='mb-10'>
                <label
                  htmlFor='email'
                  className='form-label'
                  style={{
                    fontWeight: 'bolder',
                    fontSize: '15px',
                  }}
                >
                  Email
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='col-md-6'>
              <div className='mb-10'>
                <label
                  htmlFor='employeeId'
                  className='form-label'
                  style={{
                    fontWeight: 'bolder',
                    fontSize: '15px',
                  }}
                >
                  Employee ID
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='employeeId'
                  name='employee_Id'
                  value={formData.employee_Id}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <div className='mb-10'>
                <label
                  htmlFor='gender'
                  className='form-label'
                  style={{
                    fontWeight: 'bolder',
                    fontSize: '15px',
                  }}
                >
                  Gender &nbsp; &nbsp; <span className='optional'>optional</span>
                </label>
                <select
                  className='form-select'
                  id='gender'
                  name='gender'
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value=''>Select Gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </select>
              </div>
            </div>

            <div className='col-md-6'>
              <div className='mb-10'>
                <label
                  htmlFor='mobileNumber'
                  className='form-label'
                  style={{
                    fontWeight: 'bolder',
                    fontSize: '15px',
                  }}
                >
                  Mobile Number &nbsp; &nbsp; <span className='optional'>optional</span>
                </label>
                <input
                  type='number'
                  className='form-control'
                  id='mobileNumber'
                  name='mobile_number'
                  value={formData.mobile_number}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <div className='mb-10'>
                <label
                  htmlFor='mobileNumber'
                  className='form-label'
                  style={{
                    fontWeight: 'bolder',
                    fontSize: '15px',
                  }}
                >
                  Location &nbsp; &nbsp; <span className='optional'>optional</span>
                </label>
                <select
                  className='form-select form-select-lg'
                  id='location'
                  name='location'
                  value={formData.location}
                  onChange={handleChange}
                >
                  <option value=''>Select Location</option>
                  {/* Map through the locations data to populate the options */}
                  {locations.map((location) => (
                    <option key={location.id} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='col-md-6'>
              <div className='mb-10'>
                <label
                  htmlFor='dateOfBirth'
                  className='form-label'
                  style={{
                    fontWeight: 'bolder',
                    fontSize: '15px',
                  }}
                >
                  Date Of Birth &nbsp; &nbsp; <span className='optional'>optional</span>
                </label>
                <input
                  type='date'
                  className='form-control'
                  id='dateOfBirth'
                  name='date_of_birth'
                  value={formData.date_of_birth}
                  max='2012-12-31' // Set the maximum allowed date
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-end'>
            <Link
              to='/dashboard'
              style={{
                cursor: 'pointer',
                color: 'black',
                border: '1px solid black',
                padding: '10px',
                borderRadius: '2px 2px 2px 2px',
                marginRight: '2%',
                width: '143px',
                height: '42px',
                paddingLeft: '8%',
              }}
            >
              Back{' '}
            </Link>
            <button
              type='submit'
              style={{
                cursor: 'pointer',
                color: 'white',
                border: '1px solid black',
                padding: '10px',
                borderRadius: '2px 2px 2px 2px',
                width: '143px',
                backgroundColor: 'black',
                height: '42px',
              }}
            >
              Save
            </button>
          </div>
        </form>
      
    </>
  )
}
export default AddEmp
