import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import './project.css'
import {RichTextEditorComponent, Inject, Toolbar} from '@syncfusion/ej2-react-richtexteditor'
import '@syncfusion/ej2-base/styles/material.css'
import '@syncfusion/ej2-react-richtexteditor/styles/material.css'
import CreatableSelect from 'react-select/creatable'
import makeAnimated from 'react-select/animated'
import {Accordion, Card, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useHistory} from 'react-router-dom'
import {addProjectmaster} from '../../../../Store/App/Manager/addProjectMaster'
import {useDispatch} from 'react-redux'
import {PageTitle} from '../../../../_metronic/layout/core'
import {useFormik} from 'formik'
import * as Yup from 'yup'

const AddProject = () => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    project_title: '',
    project_manager: '',
    start_date: '',
    end_date: '',
    project_description: '',
    client_name: '',
    status: '',
    project_summary: '', // Added for project summary
    technology_stack: '', // Added for technology stack
    roles_and_responsibility: '',
    selected_employee: [],
  })

  const skills2 = [
    {value: 'java', label: 'Java'},
    {value: 'python', label: 'Python'},
    {value: 'csharp', label: 'C#'},
    {value: 'javascript', label: 'JavaScript'},
    {value: 'ruby', label: 'Ruby'},
    {value: 'html', label: 'HTML'},
    {value: 'css', label: 'CSS'},
  ]

  const [projectTitles, setProjectTitles] = useState([])
  const [endDateDisabled, setEndDateDisabled] = useState(false)

  const [selectedSkills, setSelectedSkills] = useState([])

  const handleSkillRemoved = (removedSkill) => {
    // Update the selectedSkills array by removing the specified skill
    setSelectedSkills((prevSkills) => prevSkills.filter((skill) => skill !== removedSkill))

    // ... (Other code you want to include when a skill is removed)
  }
  const handleChange = (e) => {
    const {name, value} = e.target
    console.log(name,value)

    // Use a callback function to correctly update the state
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  function onRichTextChange(editorName, content) {
    setFormData((prevData) => ({
      ...prevData,
      [editorName]: content,
    }))
  }

  const handleCheckboxChange = () => {
    setEndDateDisabled(!endDateDisabled)

    if (!endDateDisabled) {
      setFormData({
        ...formData,
        end_date: new Date().toISOString().split('T')[0],
      })
    } else {
      setFormData({
        ...formData,
        end_date: '',
      })
    }
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(formData)
  //   addProjectToBackend()
  // }

  const addProjectToBackend = async () => {
    // ... (previous addProjectToBackend function)
  }

  const handleProjectSummaryChange = (args) => {
    setFormData({...formData, project_summary: args.value})
  }

  const [isSummaryValid, setIsSummaryValid] = useState(true)

  const [technologyStack, setTechnologyStack] = useState('')

  const handleSave = () => {
    // ... (Other code)

    const projectData = {
      // ... (Other properties)
      technology_stack: technologyStack,
    }

    // ... (Other code)
  }

  const onSkillSelected = (selectedSkill, e) => {
    e.preventDefault()
    e.stopPropagation()

    // ... (Rest of the function)

    // Create a badge element
    const badgeElement = document.createElement('span')
    badgeElement.className = 'badge badge-pill badge-secondary text-dark badge-lg mx-1'
    badgeElement.textContent = `+ ${selectedSkill}`

    // Update the selectedSkills array with the new skill
    setSelectedSkills((prevSkills) => [...prevSkills, selectedSkill])

    // ... (Rest of the function)

    // Append the badge to the input area
    const inputElement = document.getElementById('skillInput')
    if (inputElement) {
      inputElement.appendChild(badgeElement)
    }
  }
  const onTechnologyInputChange = (inputValue) => {
    const userInput = inputValue.toLowerCase()
    const filteredResults = skills2.filter((skill) => skill.label.toLowerCase().includes(userInput))
    setFilteredSkills(filteredResults)
  }

  const handleSkillSelected = (selectedSkill) => {
    setSelectedSkills((prevSkills) => [...prevSkills, selectedSkill])
  }

  const [proficientOptions, setProficientOptions] = useState([])

  const handleCreate = (inputValue, setOptions) => {
    const newOption = {value: inputValue, label: inputValue}
    setOptions((prevOptions) => [...prevOptions, newOption])
  }

  const [filteredSkills, setFilteredSkills] = useState([])

  const skills = ['Java', 'Python', 'C#', 'JavaScript', 'Ruby', 'HTML', 'CSS']

  const onInputChanged = (e) => {
    const userInput = e.target.value.toLowerCase()
    const filteredResults = skills.filter((skill) => skill.toLowerCase().includes(userInput))
    setFilteredSkills(filteredResults)
  }

  const handleInputChanged = (e) => {
    const userInput = e.target.value.toLowerCase()
    const filteredResults = skills.filter((skill) => skill.toLowerCase().includes(userInput))
    setFilteredSkills(filteredResults)
  }

  const [technologyStackDescription, setTechnologyStackDescription] = useState('')

  const handleTechnologyStackChange = (args) => {
    setTechnologyStackDescription(args.value)
  }

  const [rolesAndResponsibilities, setRolesAndResponsibilities] = useState('')

  const handleRolesAndResponsibilitiesChange = (args) => {
    setRolesAndResponsibilities(args.value)
  }

  const [accordionExpanded, setAccordionExpanded] = useState(false)

  const handleAccordionToggle = () => {
    setAccordionExpanded(!accordionExpanded)
  }

  const handleEmployeeCheckboxChange = (e) => {
    const employeeId = parseInt(e.target.value, 10)
    setFormData((prevFormData) => {
      const selectedEmployees = prevFormData.selected_employee.includes(employeeId)
        ? prevFormData.selected_employee.filter((id) => id !== employeeId)
        : [...prevFormData.selected_employee, employeeId]
      return {...prevFormData, selected_employee: selectedEmployees}
    })
  }

  const employeeList = [
    {id: 1, name: 'Employee 1'},
    {id: 2, name: 'Employee 2'},
    // Add more employees as needed
  ]

  const handleBack = () => {
    // Use history.push to navigate to the 'Allproject' route
    history.push('/allProject')
  }

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)

    try {
      // Dispatch the addProjectmaster action with the form data
      await dispatch(addProjectmaster(formData))

      // You can handle success actions here, like showing a success message or redirecting
      console.log('Project added successfully')

      // Optionally, you can navigate to another page after successful submission
      history.push('/allProject')
    } catch (error) {
      // Handle error, you can show an error message or log it
      console.error('Error adding project:', error.message)
    }
  }

  const customStyles = {
    menuList: (base, state) => ({
      ...base,
      maxHeight: '200px', // Set the maximum height as needed
      overflowY: 'auto',
      // Add vertical scrollbar
    }),
    option: (base, state) => ({
      ...base,
      height: '40px', // Adjust the height as needed
    }),
    menu: (base, state) => ({
      ...base,
      width: '150px', // Adjust the width as needed
    }),
  }

  const validationSchema = Yup.object().shape({
    project_title: Yup.string().required('Project Name is required'),
    organization_name: Yup.string().required('Organization Name is required'),
    project_summary: Yup.string().required('Project Summary is required'), // Include this line
    technology_stack: Yup.string().required('Technology Stack is required'),
    roles_and_responsibility: Yup.string().required('Roles and Responsibility is required'),
  })

  const formik = useFormik({
    initialValues: {
      project_title: '',
      organization_name: '',
      technology_stack: '',
      roles_and_responsibility: '',
      project_summary: '',
      // ... (other initial values)
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(addProjectmaster(values))
        console.log('Project added successfully')
        history.push('/allProject')
      } catch (error) {
        console.error('Error adding project:', error.message)
      }
    },
  })


  const [technologyOptions, setTechnologyOptions] = useState([])

  const fetchTechnologies = async () => {
    try {
      const response = await Axios.get('http://localhost:8082/api/technologies/list')
      const data = response.data

      // Extracting technology names from the array of objects
      const options = data.map((technology) => ({
        value: technology.technology_name,
        label: technology.technology_name,
      }))

      // Set the technologyOptions state with the transformed data
      setTechnologyOptions(options)
    } catch (error) {
      console.error('Error fetching employee data:', error)
    }
  }

  // Fetch technologies when the component mounts
  useEffect(() => {
    fetchTechnologies()
  }, [])
  return (
    <>
      <PageTitle>Add Project</PageTitle>
      <div>
        <form onSubmit={formik.handleSubmit} style={{marginLeft: '2%', marginTop: '3%'}}>
          <div className='row mb-3'>
            <div className='col'>
              <label htmlFor='projectName' style={{fontWeight: 'bold'}}>
                Project Name
              </label>
              <input
                type='text'
                id='projectTitle'
                name='project_title'
                value={formik.values.project_title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${
                  formik.touched.project_title && formik.errors.project_title ? 'is-invalid' : ''
                }`}
              />
              {formik.touched.project_title && formik.errors.project_title && (
                <div className='invalid-feedback'>{formik.errors.project_title}</div>
              )}
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col'>
              <label htmlFor='startDate' style={{fontWeight: 'bold'}}>
                Start Date
              </label>
              <input
                type='date'
                id='startDate'
                name='start_date'
                value={formData.start_date}
                onChange={handleChange}
                className='form-control'
              />
            </div>

            <div className='col'>
              <label htmlFor='endDate' style={{fontWeight: 'bold'}}>
                End Date
              </label>
              <input
                type='date'
                id='endDate'
                name='end_date'
                value={formData.end_date}
                onChange={handleChange}
                className='form-control'
                disabled={endDateDisabled}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
                marginLeft: '49%',
                marginTop: '10px',
              }}
            >
              <input
                type='checkbox'
                style={{width: '20px', height: '20px', marginLeft: '10px'}}
                checked={endDateDisabled}
                onChange={handleCheckboxChange}
              />
              <label style={{marginTop: '2%', marginLeft: '1%'}}>Current</label>
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col' style={{gap: '1%'}}>
              <label htmlFor='clientName' style={{fontWeight: 'bold'}}>
                Client Name
                <span style={{color: 'gray', fontWeight: 'normal'}}>Optional</span>
              </label>
              <input
                type='text'
                id='clientname'
                name='client_name'
                value={formData.client_name}
                onChange={handleChange}
                className='form-control'
              />
            </div>

            <div className='col'>
              <label htmlFor='clientName' style={{fontWeight: 'bold'}}>
                Organization Name
              </label>
              <input
                type='text'
                id='organizationName'
                name='organization_name'
                value={formik.values.organization_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${
                  formik.touched.organization_name && formik.errors.organization_name
                    ? 'is-invalid'
                    : ''
                }`}
              />
              {formik.touched.organization_name && formik.errors.organization_name && (
                <div className='invalid-feedback'>{formik.errors.organization_name}</div>
              )}
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='professionalSummary' style={{fontWeight: 'bold', marginBottom: '3%'}}>
              Project Summary
            </label>
            <RichTextEditorComponent
              id='projectSummary'
              height='170px'
              toolbarSettings={{
                items: [
                  'Bold',
                  'Italic',
                  'Underline',
                  'Formats',
                  'Alignments',
                  'OrderedList',
                  'UnorderedList',
                ],
              }}
              value={formik.values.project_summary}
              change={(args) => {
                formik.setFieldValue('project_summary', args.value)
                formik.setFieldTouched('project_summary', true)
              }}
              onBlur={() => formik.setFieldTouched('project_summary', true)}
              style={{border: formik.errors.project_summary ? '1px solid red' : ''}}
            >
              <Inject services={[Toolbar]} />
            </RichTextEditorComponent>
            {formik.errors.project_summary && formik.touched.project_summary && (
              <div style={{color: 'red', marginTop: '2%'}}>{formik.errors.project_summary}</div>
            )}
          </div>
          <div style={{marginTop: '4%'}}>
            <h6>Technologies</h6>
            <CreatableSelect
              isMulti
              options={technologyOptions}
              value={proficientOptions}
              onChange={(newOptions) => setProficientOptions(newOptions)}
              onCreateOption={(inputValue) => handleCreate(inputValue, setProficientOptions)}
              onInputChange={onTechnologyInputChange}
              styles={customStyles}
            />
            <br />
            {/* <p>
              Suggestions &nbsp;
              {filteredSkills.map((suggestion, index) => (
                <span
                  key={index}
                  className='badge badge-pill badge-secondary text-dark badge-lg mx-1'
                >
                  + {suggestion.label}
                </span>
              ))}
            </p> */}
          </div>
          <div className='mb-3'>
            <label htmlFor='technologyStack' style={{fontWeight: 'bold', marginBottom: '3%'}}>
              Technology Stack
            </label>
            <RichTextEditorComponent
              id='technologyStack'
              height='170px'
              toolbarSettings={{
                items: [
                  'Bold',
                  'Italic',
                  'Underline',
                  'Formats',
                  'Alignments',
                  'OrderedList',
                  'UnorderedList',
                ],
              }}
              value={formik.values.technology_stack}
              change={(args) => {
                formik.setFieldValue('technology_stack', args.value)
                formik.setFieldTouched('technology_stack', true)
              }}
              onBlur={() => formik.setFieldTouched('technology_stack', true)}
              style={{border: formik.errors.technology_stack ? '1px solid red' : ''}}
            >
              <Inject services={[Toolbar]} />
            </RichTextEditorComponent>
            {formik.errors.technology_stack && formik.touched.technology_stack && (
              <div style={{color: 'red', marginTop: '2%'}}>{formik.errors.technology_stack}</div>
            )}
          </div>

          <div className='mb-3'>
            <label
              htmlFor='technologyStack'
              style={{fontWeight: 'bold', marginTop: '2%', marginBottom: '3%'}}
            >
              Roles and Responsibility
            </label>
            <RichTextEditorComponent
              id='rolesAndResponsibilities'
              height='170px'
              toolbarSettings={{
                items: [
                  'Bold',
                  'Italic',
                  'Underline',
                  'Formats',
                  'Alignments',
                  'OrderedList',
                  'UnorderedList',
                ],
              }}
              value={formik.values.roles_and_responsibility}
              change={(args) => {
                formik.setFieldValue('roles_and_responsibility', args.value)
                formik.setFieldTouched('roles_and_responsibility', true)
              }}
              style={{border: formik.errors.roles_and_responsibility ? '1px solid red' : ''}}
            >
              <Inject services={[Toolbar]} />
            </RichTextEditorComponent>
            {formik.errors.roles_and_responsibility && (
              <div style={{color: 'red', marginTop: '2%'}}>
                {formik.errors.roles_and_responsibility}
              </div>
            )}
          </div>

          <div className='mb-3'>
            <label htmlFor='selectEmployee' style={{fontWeight: 'bold', marginTop: '4%'}}>
              Select Employee
            </label>
            <Accordion
              expanded={accordionExpanded}
              onToggle={() => setAccordionExpanded(!accordionExpanded)}
            >
              <Accordion.Item eventKey='0'>
                <Accordion.Header>Select Employee</Accordion.Header>
                <Accordion.Body>
                  {employeeList.map((employee) => (
                    <div key={employee.id} className='form-check'>
                      <input
                        type='checkbox'
                        id={`employeeCheckbox-${employee.id}`}
                        name='selected_employee'
                        value={employee.id}
                        checked={formData.selected_employee.includes(employee.id)}
                        onChange={handleEmployeeCheckboxChange}
                        className='form-check-input'
                      />
                      <label
                        htmlFor={`employeeCheckbox-${employee.id}`}
                        className='form-check-label'
                      >
                        {employee.name}
                      </label>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
              marginBottom: '5%',
            }}
          >
            <button
              type='button'
              className=''
              onClick={handleBack}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid black',
                color: 'black',
                width: '15%',
                marginLeft: '67%',
              }}
            >
              Back
            </button>
            <button
              type='submit'
              className=''
              style={{
                backgroundColor: 'black',
                border: '1px solid black',
                color: 'white',
                width: '15%',
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddProject
