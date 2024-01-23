import React, {useState, useEffect} from 'react'
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
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faChevronDown, faChevronUp, faPlus} from '@fortawesome/free-solid-svg-icons'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './Form.css'
import {useDispatch, useSelector} from 'react-redux'
import {getProjects} from '../../../Store/App/Manager/getProjects'
import {updateProject} from '../../../Store/App/Manager/updateProject'
import {getAsignedProject} from '../../../Store/App/Manager/getAsignedProject'
import SavedProjectContent from './SavedProjectContent'
import axios from 'axios'
import CreatableSelect from 'react-select/creatable';
RichTextEditor.Inject(HtmlEditor, Image, Link, Toolbar, Count, QuickToolbar)

const ProjectContent = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [projectURL, setProjectURL] = useState('')
  const [clientName, setClientName] = useState('')
  const [organizationName, setOrganizationName] = useState('')
  const [projectSummary, setProjectSummary] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedSkills, setSelectedSkills] = useState([])
  const [projectID, setProjectID] = useState('')
  const skills = ['Java', 'Python', 'C#', 'Javascript', 'Ruby']
  const [filteredSkills, setFilteredSkills] = useState(skills)
  const onratechange = (editorName, content) => {
    console.log('Rich text changed', editorName, content)
    setTemplateData((prevData) => ({
      ...prevData,
      [editorName]: content,
    }))
  }
  const [options, setOptions] = useState([])
  const [organizationOptions, setOrganizationOptions] = useState([])
  const [isCurrent, setIsCurrent] = useState(false)

  const [showForm, setShowForm] = useState(false)
  // Other useState hooks and functions go here
  const [showAccordian, setShowAccordian] = useState(false)
  const [showProjectDropdown, setShowProjectDropdown] = useState(false)
  const [isProjectTitleSelected, setIsProjectTitleSelected] = useState(false)
  const [organizationTitle, setOrganizationTitle] = useState('')
  const [showOrganizationDropdown, setShowOrganizationDropdown] = useState(false)
  const [isOrganizationTitleSelected, setIsOrganizationTitleSelected] = useState(false)
  const [errors, setErrors] = useState({})

  const handleCheckboxChange = (e) => {
    setIsCurrent(e.target.checked)
    setEndDate('')
  }

  const endDateField = isCurrent ? '' : endDate

  const handleAddMoreProject = () => {
    setShowForm(true)
    setShowAccordian(false)
  }

  const allprojects = useSelector((state) => state.projects)
  const allAsignProjects = useSelector((state) => state.auth.user.employeeProject)
  const dispatch = useDispatch()
  console.log('Allprojects.....', allprojects)
  console.log('All Asigned projects.....', allAsignProjects)
  const user_id = useSelector((state) => state.auth.user.user_id)
  console.log('user_id', user_id)

  useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
      try {
        // Dispatch actions to get projects and assigned projects
        await dispatch(getProjects())
        await dispatch(getAsignedProject(user_id))
      } catch (error) {
        console.error('Error fetching data:', error)
        // Handle error appropriately
      }
    }
    fetchData()
  }, [dispatch, user_id])

  useEffect(() => {
    // Handle updates to 'allprojects'
    if (Array.isArray(allprojects?.project) && allprojects.project.length > 0) {
      const projectOptions = allprojects.project.map((project) => ({
        value: project.project_title,
        label: project.project_title,
      }))
      setOptions(projectOptions)

      const uniqueOrganizations = Array.from(
        new Set(allprojects.project.map((project) => project.organization_name))
      )
      const organizationOptions = uniqueOrganizations.map((org) => ({
        value: org,
        label: org,
      }))
      setOrganizationOptions(organizationOptions)
    }
  }, [allprojects])

  const handleProjectTitleChange = (e) => {
    setShowProjectDropdown(!showProjectDropdown)
    setIsProjectTitleSelected(true)
    const selectedTitle = e.target.value // Retrieve the selected project title

    // Use the selected title to find the associated project details from the 'allprojects' data
    if (selectedTitle === 'custom') {
      // Handle the custom input separately
      setProjectTitle('')
      setSavedProjectTitle('') // Clear the saved project title
      setShowForm(true)
      setShowAccordian(false)
    } else {
      // Handle the selection of an existing project title
      const selectedProject = allprojects.project.find(
        (project) => project.project_title === selectedTitle
      )

      console.log('Selected Project:', selectedProject)

      if (selectedProject) {
        // Extract data from the selected project and set the respective states
        setProjectID(selectedProject.project_master_id)
        setStartDate(formatDate(selectedProject.start_date) || '')
        setEndDate(formatDate(selectedProject.end_date) || '')
        setProjectURL(selectedProject.project_url || '')
        setClientName(selectedProject.client_name || '')
        // setProjectSummary(selectedProject.project_summary || '')
        setProjectTitle(selectedTitle) // Set the selected project title

        // Update the 'templateData' state values (if applicable)
        setTemplateData({
          project_summary: selectedProject.project_summary || '',
          technology_stack: selectedProject.technology_stack || '',
          roles_responsibility: selectedProject.roles_and_responsibility || '',
          // ...
        })

        // Update the 'selectedSkills' state with the skills associated with the project
        setSelectedSkills(selectedProject.skills || [])

        // Find the associated organization name
        const selectedOrganization = allprojects.project.find(
          (project) => project.project_title === selectedTitle
        )

        if (selectedOrganization) {
          setOrganizationName(selectedOrganization.organization_name || '') // Set the organization name
        }

        // Additional data population based on the selected project can be added
        // ...

        setSavedProjectTitle(selectedTitle) // Store the selected project title for further reference
      }
    }
  }

  const [projectTitle, setProjectTitle] = useState('')
  // ... (Other useState hooks)

  const [templateData, setTemplateData] = useState({
    project_summary: '',
    technology_stack: '', // Add technology_stack to templateData
    roles_responsibility: '', // Add roles_responsibility to templateData
  })

  const [savedProjectTitle, setSavedProjectTitle] = useState('')

  // const options = ['EIQ', 'Econsys V5', 'TruU', 'DKG']

  // const handleArrowClick = (e) => {
  //   e.stopPropagation() // Prevents the event from propagating to the parent elements
  //   setShowOptions(!showOptions)
  // }

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    setShowOptions(false)
  }

  //Validation
  const validateProjectTitle = (value) => {
    // Validate Project Title
    if (!value) {
      return 'Project Title is required'
    }

    // Validate Project Title as min 3 words

    if (value.length < 3) {
      return 'Project Title should have at least 3 Characters'
    } else if (value.length > 75) {
      return 'Project Title should have at max 75 Characters'
    }

    return ''
  }

  const validateEndDate = (value) => {
    if (!isCurrent) {
      // Validate End Date only if the project is not ongoing
      if (!value) {
        return 'Project end date is required'
      }

      // Validate End Date greater than or equal to Start Date
      if (value && new Date(value) < new Date(startDate)) {
        return 'End Date should be greater than or equal to Start Date'
      }
    }

    return ''
  }

  const handleInputChange = (e, field) => {
    // Update the state based on the input field
    if (field === 'projectTitle') {
      const value = e.target.value
      setProjectTitle(value)
      // Clear the error for projectTitle when the input is valid
      setErrors((prevErrors) => ({
        ...prevErrors,
        projectTitle: validateProjectTitle(value),
      }))
    } else if (field === 'endDate') {
      const value = e.target.value
      setEndDate(value)

      // Clear the error for endDate when the input is valid
      setErrors((prevErrors) => ({
        ...prevErrors,
        endDate: validateEndDate(value),
      }))
    }

    // Add more input fields and validation functions as needed
  }

  const handleSave = async () => {
    const validationErrors = {
      projectTitle: validateProjectTitle(projectTitle),
      endDate: validateEndDate(endDate),
      organizationName: validateOrganizationName(organizationName),
      // Add more validation checks for other fields
    }

    // Set the errors state based on validation results
    setErrors(validationErrors)

    if (Object.values(validationErrors).some((error) => error !== '')) {
      // If there are validation errors, prevent saving
      return
    }

    const projectData = {
      project_master_id: projectID,
      project_title: projectTitle,
      start_date: startDate,
      current: isCurrent,
      end_date: endDate,
      project_url: projectURL,
      client_name: clientName,
      organization_name: organizationName,
      project_summary: templateData.project_summary,
      technologies: selectedSkills.join(', '),
      technology_stack: templateData.technology_stack,
      roles_and_responsibility: templateData.roles_responsibility,
      // technology_stack,
    }
    console.log('projectData......', projectData)
    dispatch(updateProject(projectData, user_id))

    // Fetch the updated list of projects after saving
    dispatch(getProjects())
    dispatch(getAsignedProject(user_id))

    setProjectID('')
    setProjectTitle('')
    setStartDate('')
    setIsCurrent(false)
    setEndDate('')
    setProjectURL('')
    setClientName('')
    setOrganizationName('')
    setTemplateData({
      project_summary: '',
      technology_stack: '',
      roles_responsibility: '',
    })
    setSelectedSkills([])
    setShowForm(false)
    setShowAccordian(true)
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
      'SourceCode',
      'Undo',
      'Redo',
    ],
    height: 28, // Set your preferred toolbar height
    fontSize: '9px', // Set your preferred font size for toolbar items
  }
  const customToolbarStyles = `
  .rdw-option-wrapper i {
    font-size: 14px; // Set your preferred size for the icons
  }
`

  const divStyle = {
    display: 'flex', // Set display to flex to make children wrap
    flexDirection: 'row', // Set the direction to row
    flexWrap: 'wrap', // Enable wrapping of children
    alignItems: 'center', // Align items to the center
    height: '50px', //
  }

  const onInputChanged = (e) => {
    const userInput = e.target.textContent.toLowerCase()
    console.log(userInput)
    const filteredResults = skills.filter((skill) => skill.toLowerCase().includes(userInput))
    setFilteredSkills(filteredResults)
  }

  const renderSuggestions = (suggestions, className) => {
    return suggestions.map((suggestion, index) => (
      <span
        key={index}
        className={className}
        onClick={(e) => onSkillSelected(suggestion, e)} // Pass the event as the second argument
      >
        + {suggestion}
      </span>
    ))
  }

  const onSkillSelected = (selectedSkill, e) => {
    e.preventDefault() // Prevent the default behavior
    e.stopPropagation() // Stop the event from propagating

    // Update the selectedSkills array with the new skill
    setSelectedSkills((prevSkills) => [...prevSkills, selectedSkill])

    // Create a badge element for the selected skill
    const badgeElement = document.createElement('span')
    badgeElement.className = 'badge badge-pill badge-secondary text-dark badge-sm mx-1'

    // Create a span element for the skill text
    const skillText = document.createElement('span')
    skillText.textContent = selectedSkill

    // Create a close button (cross icon)
    const closeButton = document.createElement('span')
    closeButton.className = 'badge-close'
    closeButton.innerHTML = '&times' // Display "×" as a close icon
    closeButton.style.cursor = 'pointer' // Change cursor to pointer on hover

    // Add an event listener to remove the badge when the close button is clicked
    closeButton.addEventListener('click', () => {
      badgeElement.remove()
      // Update the selectedSkills array to remove the deselected skill
      setSelectedSkills(selectedSkills.filter((skill) => skill !== selectedSkill))
    })

    // Append the skill text and close button to the badge
    badgeElement.appendChild(skillText)
    badgeElement.appendChild(closeButton)

    // Append the badge to the input area
    const inputElement = document.getElementById('skillInput')
    if (inputElement) {
      inputElement.appendChild(badgeElement)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    // Check if the date is valid
    if (!isNaN(date)) {
      const year = date.getFullYear()
      let month = (1 + date.getMonth()).toString().padStart(2, '0')
      let day = date.getDate().toString().padStart(2, '0')

      return `${year}-${month}-${day}`
    } else {
      return '' // Handle invalid date format
    }
  }

  const handleArrowClick = (e) => {
    e.stopPropagation() // Prevents the event from propagating to the parent elements
    setShowOptions(!showOptions)
  }
  const handleExistingProjectClick = () => {
    setShowProjectDropdown(!showProjectDropdown)
  }
  const handleExistingOrganizationClick = () => {
    setShowOrganizationDropdown(!showOrganizationDropdown)
  }

  const validateOrganizationName = (value) => {
    // Validate Organization Name
    if (!value) {
      return 'Organization Name is required'
    }
    if (value.length < 3) {
      return 'Organization Name is more than 3 letter'
    }
    // Add more organization name validation rules if needed

    return ''
  }

  const handleOrganizationNameChange = (e) => {
    // Update the organization name state
    setOrganizationName(e.target.value)

    // Validate organization name and update errors state
    setErrors((prevErrors) => ({
      ...prevErrors,
      organizationName: validateOrganizationName(e.target.value),
    }))

    // Hide the organization dropdown when an organization name is selected
    setShowOrganizationDropdown(false)
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
};




const [technologyOptions, setTechnologyOptions] = useState([]);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/technologies/list');
        const data = response.data;

        // Extracting technology names from the array of objects
        const options = data.map(technology => ({
          value: technology.technology_name,
          label: technology.technology_name,
        }));

        // Set the technologyOptions state with the transformed data
        setTechnologyOptions(options);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    // Call the fetchTechnologies function when the component mounts
    fetchTechnologies();
  }, []);
  return (
    <div>
      {allAsignProjects && allAsignProjects.length > 0 && (
        <SavedProjectContent savedProjectData={allAsignProjects} />
      )}
      {showForm && (
        <div className='form-container'>
          <div className='form-section' style={{position: 'relative'}}>
            <div className='label-container' style={{display: 'flex'}}>
              <label style={{fontWeight: 'bold'}}>Project Title</label>
              <spam
                onClick={handleExistingProjectClick}
                style={{
                  marginLeft: 'auto',
                  color: 'blue',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                Existing Project
              </spam>
            </div>
            <input
              type='text'
              defaultValue={savedProjectTitle}
              onChange={(e) => handleInputChange(e, 'projectTitle')}
              placeholder='Enter Project title'
              // disabled={isProjectTitleSelected}
            />
            {errors.projectTitle && <p style={{color: 'red'}}>{errors.projectTitle}</p>}
            {showProjectDropdown && (
              <div style={{padding: '5px'}}>
                <select
                  value={savedProjectTitle} // Use the stored selected project title to reflect the selected option
                  onChange={handleProjectTitleChange} // Handle project title change
                  style={{
                    width: '100%',
                    height: '3.4rem',
                    appearance: 'none',
                    paddingRight: '30px',
                    borderRadius: '4%',
                    padding: '4px',
                    background: 'white',
                    marginTop: '-10px',
                  }}
                >
                  <option value='' disabled>
                    Select Project Title
                  </option>
                  {options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div
            className='form-section'
            style={{display: 'flex', alignItems: 'center', marginBottom: '0%'}}
          >
            <div style={{flex: 1, marginRight: '1rem'}}>
              <label style={{fontWeight: 'bold'}}>Start Date</label>
              <input
                type='date'
                defaultValue={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div style={{flex: 1, marginLeft: '1rem'}}>
              <label style={{fontWeight: 'bold'}}>End Date</label>
              <input
                type='date'
                value={endDateField} // Display the appropriate value based on isCurrent state
                onChange={(e) => handleInputChange(e, 'endDate')}
                disabled={isCurrent} // Disable the input when the checkbox is checked
              />
            </div>
          </div>
          {errors.endDate && <p style={{color: 'red', marginBottom: '0%'}}>{errors.endDate}</p>}
          <div className='form-section' style={{display: 'flex', alignItems: 'center'}}>
            <div style={{flex: 2, marginRight: '1rem'}}>
              <input
                type='checkbox'
                style={{
                  width: '20px',
                  height: '20px',
                  marginLeft: '55%',
                  marginRight: '2%',
                  marginTop: '1rem',
                }}
                checked={isCurrent} // Reflect the checkbox status
                onChange={handleCheckboxChange} // Handle checkbox changes
              />
              <span>
                <label style={{marginBottom: '1%'}}>Current</label>
              </span>
            </div>
          </div>
          <div className='form-section' style={{display: 'flex', alignItems: 'center'}}>
            <div style={{flex: 1, marginRight: '1rem'}}>
              <label style={{fontWeight: 'bold'}}>Project URL</label>
              <input
                type='text'
                defaultValue={projectURL}
                onChange={(e) => setProjectURL(e.target.value)}
                placeholder='Enter project url'
              />
            </div>
            <div style={{flex: 1, marginLeft: '1rem'}}>
              <label style={{fontWeight: 'bold'}}>Client Name</label>
              <input
                type='text'
                defaultValue={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder='Enter client name'
              />
            </div>
          </div>
          <div className='form-section' style={{position: 'relative'}}>
            {/* <div className='form-section'>
              <label style={{fontWeight: 'bold'}}>Organization Name</label>
            </div> */}
            <div className='label-container' style={{display: 'flex'}}>
              <label style={{fontWeight: 'bold'}}>Organization Name</label>
              <spam
                onClick={handleExistingOrganizationClick}
                style={{
                  marginLeft: 'auto',
                  color: 'blue',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                Existing Organization
              </spam>
            </div>
            <input
              type='text'
              defaultValue={organizationName}
              onChange={(e) => handleOrganizationNameChange(e)}
              placeholder='Enter Organization Name'
              // disabled={isProjectTitleSelected}
            />
            {errors.organizationName && <p style={{color: 'red'}}>{errors.organizationName}</p>}

            {showOrganizationDropdown && (
              <select
                value={organizationName}
                onChange={handleOrganizationNameChange}
                style={{
                  width: '100%',
                  height: '3.4rem',
                  appearance: 'none',
                  paddingRight: '30px',
                  borderRadius: '4%',
                  padding: '4px',
                  background: 'white',
                  marginTop: '-10px',
                }}
              >
                <option value='' disabled>
                  Select Organization
                </option>
                {organizationOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className='col control-section e-rte-custom-tbar-section' id='rteCustomTool '>
            <div className='col control-section e-rte-custom-tbar-section' id='rteCustomTool '>
              <div className='rte-control-section'>
                <label style={{fontWeight: 'bold', paddingBottom: '3%'}}>Project Summary</label>
                <RichTextEditorComponent
                  valueTemplate={templateData.project_summary}
                  change={(args) => onratechange('project_summary', args.value)}
                  // backgroundColor={{white}}
                  style={{width: '100%'}}
                  height='210px'
                  id='defaultRTE'
                  toolbarSettings={toolbarSettings1}
                  // Use the appropriate toolbar settings
                >
                  <Inject services={[Toolbar]} />
                </RichTextEditorComponent>
              </div>
            </div>
            <div>
              <h6 style={{marginTop: '3%'}}>Technologies</h6>
              <CreatableSelect
                    isMulti
                    styles={customStyles}
                    options={technologyOptions}
                    // value={proficientOptions}
                    // onChange={(newOptions) => setProficientOptions(newOptions as Option[])}
                    // onCreateOption={(inputValue) => handleCreate(inputValue, setProficientOptions)}
                />
              <br />

              {/* <p
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                Suggestions &nbsp;
                {renderSuggestions(
                  filteredSkills,
                  'badge badge-pill badge-secondary text-dark badge-sm mx-1',
                  {fontSize: '0.9em'}
                )}
              </p> */}
            </div>
            <div className='form-section'>
              <label
                style={{
                  fontWeight: 'bold',
                  marginTop: '-2%',
                  paddingBottom: '3%',
                  paddingTop: '3%',
                }}
              >
                Technology Stack
              </label>
              <div className='rte-control-section'>
                <RichTextEditorComponent
                  valueTemplate={templateData.technology_stack}
                  change={(args) => onratechange('technology_stack', args.value)}
                  width='100%'
                  height='210px'
                  id='technologyStackRTE'
                  toolbarSettings={toolbarSettings1}
                  customStyle={customToolbarStyles}
                >
                  <Inject services={[Toolbar]} />
                </RichTextEditorComponent>
              </div>
            </div>
            <div className='form-section'>
              <label style={{fontWeight: 'bold', paddingBottom: '3%', paddingTop: '3%'}}>
                Roles & Responsibility
              </label>
              <div className='rte-control-section'>
                <RichTextEditorComponent
                  valueTemplate={templateData.roles_responsibility}
                  change={(args) => onratechange('roles_responsibility', args.value)}
                  width='100%'
                  height='210px'
                  id='rolesResponsibilityRTE'
                  toolbarSettings={toolbarSettings1}
                >
                  <Inject services={[Toolbar]} />
                </RichTextEditorComponent>
              </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}}>
              <button
                onClick={handleSave}
                style={{
                  padding: '0.5rem 2rem',
                  background: 'black',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          marginTop: '1rem',
          alignItems: 'center',
        }}
      >
        {/* <FontAwesomeIcon
          icon={showAccordian ? faChevronUp : faChevronDown}
          onClick={() => setShowAccordian(!showAccordian)}
        /> */}
        <FontAwesomeIcon icon={faPlus} style={{color: '#000', marginRight: '0.5rem'}} />
        <span
          style={{textDecoration: 'underline', color: '#000', cursor: 'pointer'}}
          onClick={handleAddMoreProject}
        >
          Add More Project
        </span>
      </div>
    </div>
  )
}

export default ProjectContent
