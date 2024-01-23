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
import {useHistory, useParams} from 'react-router-dom'
import {addProjectmaster} from '../../../../Store/App/Manager/addProjectMaster'
import {useDispatch} from 'react-redux'
import {editProjectMasterDetails} from '../../../../Store/App/Manager/editProjectMaster'
import {getProjectMasterById} from '../../../../Store/App/Manager/getProjectMasterById'
import {useSelector} from 'react-redux'
import {PageTitle} from '../../../../_metronic/layout/core'
import axios from 'axios'

const Editproject = () => {
  const history = useHistory()
  const {projectId} = useParams()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

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

  useEffect(() => {
    // Access the project_id here or perform any actions with it
    console.log('Project ID:', projectId)
  }, [projectId])

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
    if (endDateDisabled) {
      setFormData({...formData, end_date: ''})
    }
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(formData)
  //   addProjectToBackend()
  // }

  //   const addProjectToBackend = async () => {
  //     // ... (previous addProjectToBackend function)
  //   }

  //   const handleProjectSummaryChange = (args) => {
  //     setFormData({...formData, project_summary: args.value})
  //   }

  const [isSummaryValid, setIsSummaryValid] = useState(true)

  const [technologyStack, setTechnologyStack] = useState('')
  const [projectData, setProjectData] = useState('')
  //   const handleSave = () => {
  //     // ... (Other code)

  //     const projectData = {
  //       // ... (Other properties)
  //       technology_stack: technologyStack,
  //     }

  //     // ... (Other code)
  //   }

  //   const onSkillSelected = (selectedSkill, e) => {
  //     e.preventDefault()
  //     e.stopPropagation()

  //     // ... (Rest of the function)

  //     // Create a badge element
  //     const badgeElement = document.createElement('span')
  //     badgeElement.className = 'badge badge-pill badge-secondary text-dark badge-lg mx-1'
  //     badgeElement.textContent = `+ ${selectedSkill}`

  //     // Update the selectedSkills array with the new skill
  //     setSelectedSkills((prevSkills) => [...prevSkills, selectedSkill])

  //     // ... (Rest of the function)

  //     // Append the badge to the input area
  //     const inputElement = document.getElementById('skillInput')
  //     if (inputElement) {
  //       inputElement.appendChild(badgeElement)
  //     }
  //   }
  const onTechnologyInputChange = (inputValue) => {
    const userInput = inputValue.toLowerCase()
    const filteredResults = skills2.filter((skill) => skill.label.toLowerCase().includes(userInput))
    setFilteredSkills(filteredResults)
  }

  //   const handleSkillSelected = (selectedSkill) => {
  //     setSelectedSkills((prevSkills) => [...prevSkills, selectedSkill])
  //   }

  const [proficientOptions, setProficientOptions] = useState([])

  const handleCreate = (inputValue, setOptions) => {
    const newOption = {value: inputValue, label: inputValue}
    setOptions((prevOptions) => [...prevOptions, newOption])
  }

  const [filteredSkills, setFilteredSkills] = useState([])

  const skills = ['Java', 'Python', 'C#', 'JavaScript', 'Ruby', 'HTML', 'CSS']

  //   const onInputChanged = (e) => {
  //     const userInput = e.target.value.toLowerCase()
  //     const filteredResults = skills.filter((skill) => skill.toLowerCase().includes(userInput))
  //     setFilteredSkills(filteredResults)
  //   }

  //   const handleInputChanged = (e) => {
  //     const userInput = e.target.value.toLowerCase()
  //     const filteredResults = skills.filter((skill) => skill.toLowerCase().includes(userInput))
  //     setFilteredSkills(filteredResults)
  //   }

  const [technologyStackDescription, setTechnologyStackDescription] = useState('')

  const handleTechnologyStackChange = (args) => {
    setTechnologyStackDescription(args.value)
  }

  const [rolesAndResponsibilities, setRolesAndResponsibilities] = useState('')

  const handleRolesAndResponsibilitiesChange = (args) => {
    setRolesAndResponsibilities(args.value)
  }

  const [accordionExpanded, setAccordionExpanded] = useState(false)

  //   const handleAccordionToggle = () => {
  //     setAccordionExpanded(!accordionExpanded)
  //   }

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
      // Dispatch the editProjectDetails action with the form data
      await dispatch(editProjectMasterDetails(projectId, formData))

      // Handle success actions here

      // Optionally, you can navigate to another page after successful submission
      history.push('/allProject')
    } catch (error) {
      // Handle error
      console.error('Error editing project:', error.message)
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

  //   useEffect(() => {
  //     const fetchProjectDetails = async () => {
  //       try {
  //         const action = getProjectMasterById(projectId)
  //         await dispatch(action)
  //         console.log(action);

  //         // Update the form data with the fetched project details
  //       } catch (error) {
  //         console.error('Error fetching project details:', error.message)
  //       }
  //     }

  //     fetchProjectDetails();
  //   }, [dispatch])
  const data = useSelector((state) => state.getProjectMasterById?.projectMaster)

  useEffect(() => {
    // Dispatch the action to fetch projects when the component mounts
    dispatch(getProjectMasterById(projectId))
  }, [])

  useEffect(() => {
    // Update the formData state with data from the Redux store when the component mounts
    if (data) {
      // Convert the dates to the required format
      const formattedStartDate = new Date(data.start_date).toISOString().split('T')[0]
      const formattedEndDate = new Date(data.end_date).toISOString().split('T')[0]

      setStartDate(formattedStartDate)
      setEndDate(formattedEndDate)

      setFormData((prevFormData) => ({
        ...prevFormData,
        project_title: data.project_title || '',
        project_manager: data.project_manager || '',
        start_date: formattedStartDate || '',
        end_date: data.end_date || '',
        project_description: data.project_description || '',
        client_name: data.client_name || '',
        organization_name: data.organization_name || '',
        status: data.status || '',
        project_summary: data.project_summary || '',
        technology_stack: data.technology_stack || '',
        roles_and_responsibility: data.roles_and_responsibility || '',
        selected_employee: data.selected_employee || [],
      }))
    }
  }, [data])

  const [technologyOptions, setTechnologyOptions] = useState([])

  const fetchTechnologies = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/technologies/list')
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
    <div>
      <PageTitle>Edit Project</PageTitle>
      <form onSubmit={handleSubmit} style={{marginLeft: '2%', marginTop: '3%'}}>
        <div className='row mb-3'>
          <div className='col'>
            <label htmlFor='projectName' style={{fontWeight: 'bold'}}>
              Project Name
            </label>
            <input
              type='text'
              id='projectTitle'
              name='project_title' // <-- Remove the space
              defaultValue={data.project_title}
              onChange={handleChange}
              className='form-control'
            />
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
              defaultValue={startDate}
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
              value={endDate}
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
              onChange={() => {
                setEndDateDisabled(!endDateDisabled)
                if (endDateDisabled) {
                  setFormData({...formData, end_date: ''})
                } else {
                  setFormData({
                    ...formData,
                    end_date: new Date().toISOString().split('T')[0],
                  })
                }
              }}
            />
            <label style={{marginTop: '2%', marginLeft: '1%'}}>Current</label>
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col'>
            <label htmlFor='clientName' style={{fontWeight: 'bold'}}>
              Client Name
            </label>
            <input
              type='text'
              id='clientname'
              name='client_name'
              defaultValue={data.client_name}
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
              id='organizationname'
              name='organization_name'
              defaultValue={data.organization_name}
              onChange={handleChange}
              className='form-control'
            />
          </div>
        </div>

        <div className='mb-3'>
          <label
            htmlFor='professionalSummary'
            style={{fontWeight: 'bold', marginTop: '2%', marginBottom: '1%'}}
          >
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
            change={(args) => onRichTextChange('project_summary', args.value)}
            name='project_summary'
            value={data.project_summary}
            style={{border: isSummaryValid ? '' : '1px solid red'}}
          >
            <Inject services={[Toolbar]} />
          </RichTextEditorComponent>
          {!isSummaryValid && (
            <div style={{color: 'red', marginTop: '9px'}}>Please fill in the Project Summary.</div>
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
          <p>
            Suggestions &nbsp;
            {filteredSkills.map((suggestion, index) => (
              <span
                key={index}
                className='badge badge-pill badge-secondary text-dark badge-lg mx-1'
              >
                + {suggestion.label}
              </span>
            ))}
          </p>
        </div>
        <div className='mb-3'>
          <label htmlFor='technologyStack' style={{fontWeight: 'bold', marginBottom: '2%'}}>
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
            value={data.technology_stack}
            change={(args) => onRichTextChange('technology_stack', args.value)}
            style={{border: isSummaryValid ? '' : '1px solid red'}}
          >
            <Inject services={[Toolbar]} />
          </RichTextEditorComponent>
        </div>

        <div className='mb-3'>
          <label
            htmlFor='technologyStack'
            style={{fontWeight: 'bold', marginTop: '2%', marginBottom: '2%'}}
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
            value={data.roles_and_responsibility} // Corrected variable name
            change={(args) => onRichTextChange('roles_and_responsibility', args.value)}
            style={{border: isSummaryValid ? '' : '1px solid red'}}
          >
            <Inject services={[Toolbar]} />
          </RichTextEditorComponent>
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
                    <label htmlFor={`employeeCheckbox-${employee.id}`} className='form-check-label'>
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
            justifyContent: 'space-between', // Change to 'space-between'
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
  )
}

export default Editproject
