import React, {FC, useState, ChangeEvent, useEffect, useRef} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import '../Managerdashboard/accordiam.css'
import {DropDownListComponent} from '@syncfusion/ej2-react-dropdowns'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons'
import {
  AccordionComponent,
  AccordionItemDirective,
  AccordionItemsDirective,
} from '@syncfusion/ej2-react-navigations'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import camera from './camera.jpg'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {Logout, AuthPage} from '../../modules/auth'
import ProjectContent from './ProjectContent'
import EducationContent from './EducationContent'
import ResumePreview from '../../../Screens/App/Manager/MyResume/ResumePreview/ResumePreview'
import {
  Count,
  HtmlEditor,
  Image,
  Link,
  RichTextEditor,
  Toolbar,
  QuickToolbar,
  Inject,
  RichTextEditorComponent,
} from '@syncfusion/ej2-react-richtexteditor'
import {editaddtionaldetails} from '../../../Store/App/Manager/editAddtionalDetails'
import TechnologyExpertise from './TechnologyExpertise'
import ProffesionalExperience from './ProffesionalExperience'
import Certificates from './Certificates'
import {toast} from 'react-toastify'
import {addProfileImage} from '../../../Store/App/Manager/addProfileImage'

RichTextEditor.Inject(HtmlEditor, Image, Link, Toolbar, Count, QuickToolbar)

function DashboardPage() {
  let rteObj = useRef('')
  const [imageData, setimageData] = useState(null)
  const [imagePreview, setImagePreview] = useState(camera)
  const [isEditingImage, setIsEditingImage] = useState(false)
  const user = useSelector((state) => state.auth.user)
  console.log('user1', user)
  useEffect(() => {
    setImagePreview(`data:image/png;base64,` + user?.image)
  }, [user])
  const API_URL = process.env.REACT_APP_API_URL || 'api'
  //const formData2= new FormData();
  // const handleImageUpload = (event) => {

  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader()
  //     formData2.append('imageFile',event.target.files)
  //     reader.onload = (e) => {
  //       if (e.target && e.target.result) {
  //       setSelectedImage(e.target.result) // Type assertion here
  //         console.log('e.target.result',e.target.result)

  //         console.log('formData2',formData2.keys)
  //        console.log('imagedata',selectedImage )

  //       }
  //     }
  //     reader.readAsDataURL(event.target.files[0])

  //   }
  // }
  const handleUploadClick = (event) => {
    console.log(event.target.files[0])
    let file = event.target.files[0]
    const imageData = new FormData()
    imageData.append('imageFile', file)
    setimageData(imageData)
    setImagePreview(URL.createObjectURL(file))
  }

  // useEffect(() => {
  //   setFormData((prevFormData) => {
  //     // Check if user exists and is not empty
  //     if (user && Object.keys(user).length > 0) {
  //       const updatedFormData = {
  //         ...prevFormData,
  //         professional_summary: user.professional_summary,
  //       }

  //       // Compare each field and keep the original value if it hasn't changed
  //       for (const key in updatedFormData) {
  //         if (updatedFormData[key] === prevFormData[key]) {
  //           updatedFormData[key] = prevFormData[key]
  //         }
  //       }

  //       return updatedFormData
  //     }
  //     return prevFormData
  //   })
  // }, [user])

  const containerStyle = {
    // display: 'flex',
    backgroundColor: '#eaeff2',
  }
  const accordionWrapperStyle = {
    // Updated background color
    padding: '2',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    height: '100%',
    overflow: 'hidden',
    color: 'black',
  }

  const accordionStyle = {
    width: '98%',
    margin: 'auto',
    maxWidth: '100%',
    height: '100%',
    color: 'black',
  }

  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false)
  const [showAdditionalDetailsForm, setShowAdditionalDetailsForm] = useState(false)

  const handleEditClick = (event) => {
    event.preventDefault() // Prevent the default behavior of the button
    setShowAdditionalDetailsForm(!showAdditionalDetailsForm)
  }

  const genders = ['Male', 'Female', 'Other']

  const AdditionalDetailsForm = () => {
    const [selectedGender, setSelectedGender] = useState('')

    const user = useSelector((state) => state.auth.user)

    const [userData, setUserData] = useState(user)

    const [formData, setFormData] = useState({
      date_of_joining: '',
      mobile_number: '',
      location: '',
      date_of_birth: '',
      gender: '',
      linkedin_lnk: '',
      portfolio_link: '',
      blogs_link: '',
    })

    const handleInputChange = (event) => {
      const {name, value} = event.target

      // Validate mobile number to accept up to 10 digits
      if (name === 'mobile_number' && value.length > 10) {
        console.error('Mobile number must be up to 10 digits')
        return
      }

      setFormData({...formData, [name]: value})
    }

    const dispatch = useDispatch()

    const handleSaveAdditionalForm = () => {
      // Validate mobile number to accept up to 10 digits
      if (
        formData.mobile_number &&
        formData.mobile_number.length > 0 &&
        formData.mobile_number.length < 10
      ) {
        // Display an error toast
        toast.error('Mobile number must be up to 10 digits', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        return
      }

      console.log('formData', formData)
      dispatch(editaddtionaldetails(user.user_id, formData))

      // Display a success toast notification
      toast.success('Details added successfully', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }

    //2nd component//

    return (
      <div style={{marginTop: '20px', width: '100%'}}>
        <form style={{width: '100%'}}>
          <div style={{display: 'flex', marginBottom: '20px'}}>
            <div style={{flex: '1', marginRight: '10px', color: 'black'}}>
              <label htmlFor='date_of_joining' style={{fontWeight: 'bold'}}>
                Date of Joining
              </label>
              <input
                type='text'
                id='date_of_joining'
                name='date_of_joining'
                className='form-control'
                style={{width: '100%', fontWeight: 'normal'}}
                defaultValue={user.date_of_joining}
                disabled
              />
            </div>
            <div style={{flex: '1'}}>
              <label htmlFor='mobile_number' style={{fontWeight: 'bold'}}>
                Mobile Number
              </label>
              <span className='optional' style={{marginLeft: '4%'}}>
                Optional
              </span>
              <input
                type='text'
                id='mobile_number'
                name='mobile_number'
                className='form-control'
                placeholder='Enter mobile no.'
                defaultValue={user.mobile_number}
                onChange={handleInputChange}
                style={{fontWeight: 'normal'}}
              />
            </div>
          </div>
          <div style={{display: 'flex', marginBottom: '20px'}}>
            <div style={{flex: '1'}}>
              <label htmlFor='location' style={{marginLeft: '1%', fontWeight: 'bold'}}>
                Location
              </label>
              <span className='optional' style={{marginLeft: '4%'}}>
                Optional
              </span>
              <input
                type='text'
                id='location'
                name='location'
                className='form-control'
                style={{fontWeight: 'normal'}}
                placeholder='Enter location here'
                defaultValue={user.location}
                onChange={handleInputChange}
              />
            </div>
            <div style={{flex: '1'}}>
              <label htmlFor='Date of Birth' style={{marginLeft: '4%', fontWeight: 'bold'}}>
                Date of Birth
              </label>
              <span className='optional' style={{marginLeft: '4%'}}>
                Optional
              </span>
              <input
                type='Date'
                id='DateOfBirth'
                name='date_of_birth'
                className='form-control'
                style={{marginLeft: '3%', width: '97%', fontWeight: 'normal'}}
                placeholder='Enter date of birth'
                max='2012-12-31' // Set the maximum allowed date
                defaultValue={user.date_of_birth}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div style={{display: 'flex', marginBottom: '20px'}}>
            <div style={{flex: '1', maxWidth: '50%'}}>
              <label htmlFor='gender' style={{marginLeft: '0%', width: '22%', fontWeight: 'bold'}}>
                Gender
              </label>
              <span className='optional' >
                Optional
              </span>
              <select
                defaultValue={user.gender} // Use value instead of defaultValue to reflect the state
                onChange={handleInputChange}
                name='gender' // Ensure the 'name' attribute is set
                className='form-control'
              >
                <option value='Not specified' disabled>
                  Select Gender
                </option>
                {genders.map((gender, index) => (
                  <option key={index} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              {/* <div
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    marginRight: '54%',
                    marginTop: '32%',
                  }}
                >
                  {selectedGender ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  )}
                </div> */}
            </div>
          </div>
          <div style={{display: 'flex'}}></div>
          <div style={{display: 'flex'}}></div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              <label htmlFor='linkedin_lnk' style={{marginRight: '10px',fontWeight: 'bold'}}>
                LinkedIn
              </label>
              <span className='optional' style={{marginLeft: '1%'}}>
                Optional
              </span>
              <input
                type='text'
                id='linkedin_lnk'
                name='linkedin_lnk'
                className='form-control'
                style={{marginLeft: '2%', fontWeight: 'normal'}}
                placeholder='https://www.linkedIn.com'
                defaultValue={user.linkedin_lnk}
                onChange={handleInputChange}
              />
              <input type='checkbox' style={{width: '20px', height: '20px', marginLeft: '10px'}} />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
                
              }}
            >
              <label htmlFor='portfolio_link' style={{marginRight: '10px',fontWeight: 'bold'}}>
                Portfolio
              </label>
              <span className='optional' style={{marginLeft: '1%'}}>
                Optional
              </span>
              <input
                type='text'
                id='portfolio_link'
                name='portfolio_link'
                className='form-control'
                style={{marginLeft: '2%', fontWeight: 'normal'}}
                placeholder='https://www.portfolio_link.com'
                defaultValue={user.portfolio_link}
                onChange={handleInputChange}
              />
              <input type='checkbox' style={{width: '20px', height: '20px', marginLeft: '10px'}} />
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <label htmlFor='blogs_link' style={{marginRight: '10px', fontWeight: 'bold'}}>
                Blog
              </label>
              <span className='optional' style={{marginLeft: '1%'}}>
                Optional
              </span>
              <input
                type='text'
                id='blogs_link'
                name='blogs_link'
                className='form-control'
                style={{marginLeft: '7%', fontWeight: 'normal', marginLeft: '8%'}}
                placeholder='https://www.blog.com'
                defaultValue={user.blogs_link}
                onChange={handleInputChange}
              />
              <input type='checkbox' style={{width: '20px', height: '20px', marginLeft: '10px'}} />
            </div>
            <button
              type='button'
              onClick={handleSaveAdditionalForm}
              style={{
                padding: '5px 10px',
                borderRadius: '5px',
                backgroundColor: 'black',
                marginTop: '4%',
                width: '12%',
                marginLeft: '88%',
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    )
  }

  const toolbarSettings1 = {
    items: [
      'Bold',
      'Italic',
      'Underline',
      '|',
      'Formats',
      'Alignments',
      'OrderedList',
      'UnorderedList',
      '|',
      // {
      //   template:
      //     '<button class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar"  style="width:100%">profile<div class="e-tbar-btn-text" style="font-weight: 500;"> &#9660;</div></button>',
      //   undo: true,
      //   tooltipText: 'Insert placeholder',
      // },

      'SourceCode',
      'Undo',
      'Redo',
      'Print',
    ],
  }

  const FirstContent = () => {
    const user = useSelector((state) => state.auth.user)

    const [userData2, setUserData2] = useState({
      user_id: user.user_id,
      professional_summary: '',
    })
    console.log(user)

    const [professionalSummary, setProfessionalSummary] = useState('')

    const handleProfessionalSummaryChange = (event) => {
      // alert(rteObj.value)
      if (rteObj.value) {
        // const {name, value} = rteObj.value
        userData2.professional_summary = rteObj.value
        console.log('professional summary ', userData2)
      } else {
        console.error('Event or event.target is undefined')
      }
    }
    const dispatch = useDispatch()

    // Inside your functional component
    const [isSummaryValid, setIsSummaryValid] = useState(true)

    const handleSave = () => {
      // Check if the content of the Rich Text Editor is empty
      if (!rteObj || !rteObj.value || rteObj.value.trim() === '') {
        setIsSummaryValid(false)
        console.log(userData2)
      }

      // Your existing save logic
      // const userData2 = {
      //   user_id: user.user_id,

      //   professional_summary: rteObj.value, // Assuming you want to save the content of the Rich Text Editor
      // }
      dispatch(editaddtionaldetails(userData2.user_id, userData2))
      dispatch(addProfileImage(imageData, user.user_id))
      //  const config = {
      //   headers: {
      //     Authorization: `Bearer ${user.accessToken}`, // Replace with your actual authorization header
      //     'Content-Type': 'multipart/form-data',
      //   },
      // }
      // axios
      // .post(
      //   `${API_URL}uploadImage/${user.user_id}`,
      //   imageData,
      //   config,
      // )

      // .then((response) => {
      //   console.log('response.data', response.data)
      //   // Update the data source after successful deletion
      //   if (response.status === 200) {
      //     console.log('Data posted successfully:', response.data)

      //   }
      // })
      // .catch((error) => {
      //   // Handle any error that occurs during deletion
      //   console.error('Error posting data:', error);

      // });
      // Reset the validation state
      setIsSummaryValid(true)

      // Display a success toast notification
      toast.success('Professional summary added successfully', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the notification after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }

    //1st component//
    const [selectedFile, setSelectedFile] = useState('')
    const fileInputRef = useRef(null)

    const handleIconClick = () => {
      // Programmatically trigger the file input click
      fileInputRef.current.click()
    }

    return (
      <div style={{marginTop: '2%'}}>
        <input type='checkbox' style={{width: '20px', height: '20px', marginLeft: '94%'}} />

        <form style={{width: '100%'}}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              position: 'relative',
            }}
          >
            {/* Left column */}
            <div style={{flex: '1', marginRight: '10px'}}>
              <label htmlFor='currentRole' style={{fontWeight: 'bold'}}>
                Current Role
              </label>
              <input
                type='text'
                id='currentRole'
                name='currentRole'
                className='form-control'
                style={{width: '100%', fontWeight: 'normal'}}
                disabled
                defaultValue={user.current_role}
              />

              <label htmlFor='fullName' style={{fontWeight: 'bold', marginTop: '10px'}}>
                Full Name
              </label>
              <input
                type='text'
                id='fullName'
                name='fullName'
                className='form-control'
                style={{width: '100%', fontWeight: 'normal'}}
                defaultValue={user.full_name}
                disabled
              />
            </div>

            {/* Right column */}
            <div
              style={{
                position: 'relative',
                width: '150px', // Set a width for the container
                height: '150px',
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            >
              <img
                // src={selectedImage}
                src={imagePreview ? `${imagePreview}` : 'file'}
                alt='Uploaded'
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '85%', // Adjust as needed
                  left: '75%', // Adjust as needed
                  transform: 'translate(-50%, -50%)', // Center the span
                  // color: 'white', // Set the color
                  fontSize: '24px', // Set the font size
                  cursor: 'pointer', // Add cursor pointer for interaction
                }}
              >
                <div>
                  <div onClick={handleIconClick}>
                    <FontAwesomeIcon icon={faEdit} style={{marginRight: '5px'}} />
                    {/* {selectedFile ? selectedFile.name : 'Click to choose a file'} */}
                  </div>
                  <input
                    accept='image/*'
                    type='file'
                    style={{display: 'none'}}
                    onChange={handleUploadClick}
                    ref={fileInputRef}
                  />
                </div>
              </span>
            </div>
          </div>

          {/* Additional details */}
          <div style={{display: 'flex', marginTop: '0%'}}>
            {/* Left column */}
            <div style={{flex: '1', marginRight: '2%', marginLeft: '0%'}}>
              <label htmlFor='employeeID' style={{fontWeight: 'bold'}}>
                Employee ID
              </label>
              <input
                type='text'
                id='employeeID'
                name='employeeID'
                className='form-control'
                style={{width: '100%', fontWeight: 'normal'}}
                defaultValue={user.employee_Id}
                disabled
              />
            </div>

            {/* Right column */}
            <div style={{flex: '1'}}>
              <label htmlFor='emailAddress' style={{fontWeight: 'bold'}}>
                Email Address
              </label>
              <input
                type='email'
                id='emailAddress'
                name='emailAddress'
                className='form-control'
                style={{width: '100%', fontWeight: 'normal'}}
                defaultValue={user.email}
                disabled
              />
            </div>
          </div>

          <div style={{justifyContent: 'space-between', marginTop: '4%'}}>
            <div
              className='col control-section e-rte-custom-tbar-section'
              id='rteCustomTool'
              style={{justifyContent: 'space-between', marginBottom: '4%'}}
            >
              <div className='rte-control-section'>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                  <input
                    type='checkbox'
                    style={{width: '20px', height: '20px', marginLeft: '10px'}}
                  />
                  <label style={{fontWeight: 'bold', marginTop: '2%', marginLeft: '1%'}}>
                    Professional Summary
                  </label>
                </div>
                <RichTextEditorComponent
                  ref={(richtexteditor) => {
                    rteObj = richtexteditor
                  }}
                  height='170px'
                  id='defaultRTE'
                  toolbarSettings={toolbarSettings1}
                  maxLength={500}
                  value={user.professional_summary} // Set the initial value directly
                  change={handleProfessionalSummaryChange}
                  style={{border: isSummaryValid ? '' : '1px solid red'}}
                >
                  <Inject services={[Toolbar]} />
                </RichTextEditorComponent>

                {!isSummaryValid && (
                  <div style={{color: 'red', marginTop: '5px'}}>
                    Please fill in the Professional Summary.
                  </div>
                )}
              </div>
            </div>

            {/* Adjusted width of Save button */}
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}}>
              <button
                type='button'
                onClick={handleSave}
                style={{
                  padding: '5px 10px',
                  borderRadius: '5px',
                  backgroundColor: 'black',
                  marginTop: '4%',
                  width: '12%',
                  marginLeft: '88%',
                }}
              >
                Save
              </button>
            </div>
          </div>
          {/* Edit Additional Details */}
          <div style={{marginTop: ''}}>
            <div style={{display: 'flex', alignItems: 'center', borderBottom: '1px solid grey'}}>
              <div style={{marginRight: '10px'}}>
                <button
                  style={{color: 'grey'}}
                  onClick={handleEditClick}
                  className='edit-details-button'
                >
                  Edit Additional Details
                </button>
              </div>
              <div>
                <FontAwesomeIcon
                  icon={showAdditionalDetailsForm ? faChevronUp : faChevronDown}
                  onClick={() => setShowAdditionalDetailsForm(!showAdditionalDetailsForm)}
                  style={{}}
                />
              </div>
            </div>
            {showAdditionalDetailsForm && <AdditionalDetailsForm />}
          </div>
        </form>
      </div>
    )
  }
  const SecondContent = () => {
    // Implement the content for the second accordion here
    return (
      <div>
        <TechnologyExpertise user_id={user.user_id} />
      </div>
    )
  }
  const ThirdContent = () => {
    // Implement the content for the second accordion here
    return (
      <div>
        <ProffesionalExperience user_id={user.user_id} />
      </div>
    )
  }
  const FourthContent = () => {
    return <ProjectContent />
  }

  const FivthContent = () => {
    // Implement the content for the second accordion here
    return <EducationContent />
  }
  const SixthContent = () => {
    // Implement the content for the second accordion here
    return (
      <div>
        <Certificates user_id={user.user_id} />
      </div>
    )
  }

  // Implement the remaining content for the other accordions

  return (
    <div className='row w-101' style={containerStyle}>
      <div className='col-md-6'>
        <div className='card card-custom'>
          <div style={accordionWrapperStyle}>
            <div style={accordionStyle}>
              <AccordionComponent expandMode='Multiple' style={{border: 'none'}}>
                <AccordionItemsDirective>
                  <AccordionItemDirective
                    expanded={true}
                    header='Personal Details'
                    cssClass='firstaccorndian'
                    content={FirstContent}
                  />
                  <AccordionItemDirective
                    header='Technology Expertise'
                    cssClass='secondaccordian'
                    content={SecondContent}
                  />
                  <AccordionItemDirective
                    header='Professional Experience'
                    cssClass='thirdaccordian'
                    content={ThirdContent}
                  />
                  <AccordionItemDirective
                    header='Project'
                    cssClass='fourthaccordian'
                    content={FourthContent} // Make sure the component is imported correctly
                  />
                  <AccordionItemDirective
                    header='Education'
                    cssClass='fivthaccordian'
                    content={FivthContent}
                  />
                  <AccordionItemDirective
                    header='Certification'
                    cssClass='sixthaccorndian'
                    content={SixthContent}
                  />
                </AccordionItemsDirective>
              </AccordionComponent>
            </div>
          </div>
        </div>
      </div>
      <div className='col-md-6'>
        <ResumePreview />
      </div>
    </div>
  )
}

const ManagerDashboardWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'My Resume'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {ManagerDashboardWrapper}
