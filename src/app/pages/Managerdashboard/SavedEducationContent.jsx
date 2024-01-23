import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons'
import {deleteeducations} from '../../../Store/App/Manager/deleteEducation'
import {editeducationdetails} from '../../../Store/App/Manager/editEducation'
import {addEducation} from '../../../Store/App/Manager/addEducation'
import {useDispatch} from 'react-redux'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SavedEducationContent = ({savedEducationData}) => {
  const [showContent, setShowContent] = useState(savedEducationData.map(() => false))
  const [showForm, setShowForm] = useState(false)
  const [university, setUniversity] = useState('')
  const [degree, setDegree] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [editingIndex, setEditingIndex] = useState(-1)
  const [selectedOption, setSelectedOption] = useState(savedEducationData.map(() => 'Showdates'))

  const toggleContent = (index) => {
    const updatedShowContent = [...showContent]
    updatedShowContent[index] = !updatedShowContent[index]
    setShowContent(updatedShowContent)

    if (updatedShowContent[index]) {
      setShowForm(false)
    }
  }

  const getFormattedDate = (dateString, option) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.getMonth()

    if (option === 'Showdates' || !option) {
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      const monthName = monthNames[month]
      return `${monthName} - ${year}`
    } else if (option === 'Showduration') {
      const endDate = new Date()
      const startYear = date.getFullYear()
      const endYear = endDate.getFullYear()
      const durationYears = endYear - startYear

      if (durationYears === 0) {
        const durationMonths = (endDate.getMonth() - month + 12) % 12

        if (durationMonths > 0) {
          return `${durationMonths} ${durationMonths === 1 ? 'month' : 'months'}`
        } else {
          // If duration is 0 months, return an empty string
          return ''
        }
      } else {
        return `${durationYears} ${durationYears === 1 ? 'year' : 'years'}`
      }
    } else {
      return ''
    }
  }

  useEffect(() => {
    const storedOptions = JSON.parse(localStorage.getItem('selectedOptions'))
    if (storedOptions) {
      setSelectedOption(storedOptions)
    }
  }, [])

  const handleSelectChange = (event, index) => {
    const updatedSelectedOptions = [...selectedOption]
    updatedSelectedOptions[index] = event.target.value
    setSelectedOption(updatedSelectedOptions)
    localStorage.setItem('selectedOptions', JSON.stringify(updatedSelectedOptions))
  }

  const handleAddEducation = () => {
    setUniversity('')
    setDegree('')
    setStartDate('')
    setEndDate('')
    setShowForm(true)
  }

  const dispatch = useDispatch()

  const handleEducationUpdate = async (index) => {
    const updatedEducation = {
      school_college: university !== '' ? university : savedEducationData[index].school_college,
      degree: degree !== '' ? degree : savedEducationData[index].degree,
      start_date: startDate !== '' ? startDate : savedEducationData[index].start_date,
      end_date: endDate !== '' ? endDate : savedEducationData[index].end_date,
    }

    try {
      // Dispatch API call with updated values
      await dispatch(editeducationdetails(savedEducationData[index].education_id, updatedEducation))

      // Reset the input fields and close the form after updating
      setUniversity('')
      setDegree('')
      setStartDate('')
      setEndDate('')
      setShowForm(false)

      // Show success toast
      toast.success('Details updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (error) {
      // Handle the error if the update fails
      console.error('Error updating education details:', error)

      // Show error toast
      toast.error('Failed to update details. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleEducationDelete = async (index) => {
    const educationID = savedEducationData[index].education_id

    try {
      // Dispatch the API call with the educationID
      await dispatch(deleteeducations(educationID))

      // Show success toast for deletion
      toast.success('Education deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      // Perform other operations after deletion if needed
    } catch (error) {
      // Handle the error if deletion fails
      console.error('Error deleting education:', error)

      // Show error toast for deletion failure
      toast.error('Failed to delete education. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <div style={{marginTop: '5%'}}>
      {savedEducationData.map((education, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '2px solid #D3D3D3',
            padding: '20px',
            borderRadius: '-1px',
            marginBottom: '20px',
            position: 'relative',
          }}
        >
          {!showContent[index] ? (
            <div>
              <p style={{fontWeight: 'bold'}}>{education.degree}</p>
              <p>
                {getFormattedDate(education.start_date, selectedOption[index])}
                {selectedOption[index] !== 'Shownothing' && ' - '}
                {getFormattedDate(education.end_date, selectedOption[index])} |{' '}
                {education.school_college}
              </p>
            </div>
          ) : (
            <div>
              <div style={{display: 'flex', marginBottom: '10px'}}>
                <div style={{flex: 1, marginRight: '20px'}}>
                  <label
                    style={{
                      fontWeight: 'bold',
                      width: '100%',
                      display: 'inline-block',
                    }}
                  >
                    University/College/School:
                  </label>
                  <input
                    type='text'
                    defaultValue={university || education.school_college}
                    onChange={(e) => setUniversity(e.target.value)}
                    style={{width: '100%'}}
                  />
                </div>
                <div style={{flex: 1}}>
                  <label style={{fontWeight: 'bold', width: '100px'}}>Degree:</label>
                  <input
                    type='text'
                    defaultValue={degree || education.degree}
                    onChange={(e) => setDegree(e.target.value)}
                    style={{width: '100%'}}
                  />
                </div>
              </div>
              <div style={{display: 'flex', marginTop: '10px'}}>
                <div style={{flex: 1, marginRight: '20px'}}>
                  <label style={{fontWeight: 'bold', width: '100px'}}>Start Date:</label>
                  <input
                    type='date'
                    defaultValue={startDate || education.start_date}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{width: '100%'}}
                  />
                </div>
                <div style={{flex: 1}}>
                  <label style={{fontWeight: 'bold', width: '100px'}}>End Date:</label>
                  <input
                    type='date'
                    defaultValue={endDate || education.end_date}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{width: '100%'}}
                  />
                </div>
              </div>
              <div style={{display: 'flex', marginTop: '10px', marginLeft: '72%'}}>
                <button
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    marginRight: '10px',
                  }}
                  onClick={() => handleEducationUpdate(index)}
                >
                  Update
                </button>
                <button
                  style={{backgroundColor: 'black', color: 'white'}}
                  onClick={() => handleEducationDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              cursor: 'pointer',
            }}
            onClick={() => toggleContent(index)}
          >
            {showContent[index] ? (
              <FontAwesomeIcon icon={faCaretUp} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
          </div>
          {!showContent[index] && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                width: '50%',
                marginLeft: '50%',
                marginTop: '0',
                marginTop: '-11%',
              }}
            >
              <div style={{marginBottom: '5px'}}>
                <input type='checkbox' name='' id='' />
              </div>
              <div>
                <select
                  value={selectedOption[index]}
                  onChange={(event) => handleSelectChange(event, index)}
                >
                  <option value='Showdates'>Show Dates</option>
                  <option value='Showduration'>Show Duration</option>
                  <option value='Shownothing'>Show Nothing</option>
                </select>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default SavedEducationContent
