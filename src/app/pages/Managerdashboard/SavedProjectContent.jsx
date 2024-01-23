import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretUp, faCaretDown, faTrash, faEdit, faPlus} from '@fortawesome/free-solid-svg-icons'

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
import {useDispatch} from 'react-redux'
import {EditorUpdateEmployeeProject} from '../../../Store/App/Manager/EditorUpdateEmployeeProject'
import {deleteEmployeeProject} from '../../../Store/App/Manager/deleteEmployeeProject'
//
RichTextEditor.Inject(HtmlEditor, Image, Link, Toolbar, Count, QuickToolbar)

const SavedProjectContent = ({savedProjectData}) => {
  let rteObj = React.useRef('')
  const [showContent, setShowContent] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showDuration, setShowDuration] = useState(false)
  const [showNothing, setShowNothing] = useState(false)
  const [showDates, setShowDates] = useState(true)
  const [projectTitle, setProjectTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [projectURL, setProjectURL] = useState('')
  const [clientName, setClientName] = useState('')
  const [organizationName, setOrganizationName] = useState('')
  const [projectSummary, setProjectSummary] = useState('')
  const [technologyStack, setTechnologyStack] = useState([])
  const [rolesAndResponsibility, setRolesAndResponsibility] = useState('')
  const [editingIndex, setEditingIndex] = useState(-1)
  const [isCurrent, setIsCurrent] = useState({})

  const skills = ['Java', 'Python', 'C#', 'Javascript', 'Ruby', 'HTML', 'CSS']
  const [filteredSkills, setFilteredSkills] = useState(skills)
  const [selectedSkills, setSelectedSkills] = useState([])
  const [showFormForProject, setShowFormForProject] = useState(savedProjectData.map(() => true))

  const [projectVisibilitySettings, setProjectVisibilitySettings] = useState(
    savedProjectData.map(() => ({
      showDates: true,
      showDuration: false,
      showNothing: false,
    }))
  )

  const toggleContent = (index) => {
    const newShowFormForProject = [...showFormForProject]
    newShowFormForProject[index] = !newShowFormForProject[index]
    setShowFormForProject(newShowFormForProject)
  }

  console.log('SavedProjectData....', savedProjectData)
  const dispatch = useDispatch()
  const handleUpdate = (index) => {
    const selectedProject = savedProjectData[index]
    const ProjectId = selectedProject.emp_project_id
    const updatedProjectData = {
      project_title: projectTitle || selectedProject.project_title,

      start_date: startDate || selectedProject.start_date,
      end_date: endDate || selectedProject.end_date,
      project_url: projectURL || selectedProject.project_url,
      client_name: clientName || selectedProject.client_name,
      project_summary: projectSummary || selectedProject.project_summary,
      organization_name: organizationName || selectedProject.organization_name,
      technologies:
        selectedSkills.length !== 0 ? selectedSkills.join(', ') : selectedProject.technologies,
      technology_stack:
        technologyStack.length !== 0 ? technologyStack : selectedProject.technology_stack,
      roles_and_responsibility: rolesAndResponsibility || selectedProject.roles_and_responsibility,
    }

    console.log('selectedProject....', selectedProject)
    console.log('updatedProjectData....', updatedProjectData, ProjectId)

    dispatch(EditorUpdateEmployeeProject(updatedProjectData, ProjectId))
    // Perform further actions such as sending this data to the API or updating state
    // For example: callAPIToUpdateProject(updatedProjectData);
    toggleContent(index)
  }

  const handleDelete = (index) => {
    const selectedProject = savedProjectData[index]
    const ProjectId = selectedProject.emp_project_id
    console.log('handleDelete' + ProjectId)
    dispatch(deleteEmployeeProject(ProjectId))
    toggleContent(index)
  }

  //form handles

  const divStyle = {
    marginBottom: '30px',
    marginTop: '7%',
  }

  const onInputChanged = (e) => {
    const userInput = e.target.textContent.toLowerCase()
    console.log(userInput)
    const filteredResults = skills.filter((skill) => skill.toLowerCase().includes(userInput))
    setFilteredSkills(filteredResults)
  }

  const handleArrowClick = (e) => {
    e.stopPropagation() // Prevents the event from propagating to the parent elements
    // setShowOptions(!showOptions)
  }

  const handleCheckboxChange = (e) => {
    setIsCurrent(e.target.checked)
    if (e.target.checked) {
      setEndDate(null)
    }
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
    e.stopPropagation() // Prevent the event from propagating to the parent elements

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

  // console.log('richtexteditor' + rteObj.value)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    // Check if the date is valid
    if (!isNaN(date)) {
      const year = date.getFullYear()
      let month = (date.getMonth() + 1).toString().padStart(2, '0') // Fix here
      let day = date.getDate().toString().padStart(2, '0')

      return `${day}/${month}/${year}`
    } else {
      return '' // Handle invalid date format
    }
  }
  const formatDateNew = (dateString) => {
    const date = new Date(dateString)
    // Check if the date is valid
    if (!isNaN(date)) {
      const year = date.getFullYear()
      let month = (1 + date.getMonth()).toString().padStart(2, '0')
      let day = date.getDate().toString().padStart(2, '0')

      return `${month}/${day}/${year}` // Switched month and day positions
    } else {
      return '' // Handle invalid date format
    }
  }

  const handleSelectChange = (e, index) => {
    const selectedOption = e.target.value

    setProjectVisibilitySettings((prevSettings) =>
      prevSettings.map((setting, i) => {
        if (i === index) {
          return {
            showDates: selectedOption === 'Show Dates',
            showDuration: selectedOption === 'Show Duration',
            showNothing: selectedOption === 'Show Nothing',
          }
        }
        return setting
      })
    )
  }

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate)
    let end

    if (endDate === null) {
      end = new Date() // Set end date to today if it's null
    } else {
      end = new Date(endDate)
    }

    const diffInMilliseconds = Math.abs(end - start)
    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24))

    const years = Math.floor(days / 365)
    const months = Math.floor((days % 365) / 30)

    if (years > 0) {
      if (months > 0) {
        return `${years} ${years === 1 ? 'year' : 'years'} ${months} ${
          months === 1 ? 'month' : 'months'
        }`
      } else {
        return `${years} ${years === 1 ? 'year' : 'years'}`
      }
    } else {
      if (months > 0) {
        return `${months} ${months === 1 ? 'month' : 'months'}`
      } else {
        return '1 month' // If the start and end dates are the same month
      }
    }
  }

  const formatMonthYear = (dateString) => {
    const date = new Date(dateString)
    const month = date.toLocaleString('en-us', {month: 'short'})
    const year = date.getFullYear()
    return `${month} ${year}`
  }

  return (
    <div style={{marginTop: '5%'}}>
      {savedProjectData.map((project, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #D3D3D3',
            padding: '10px',
            borderRadius: '-1px',
            marginBottom: '20px',
            position: 'relative',
          }}
        >
          {showFormForProject[index] ? ( // Show belo w content by default
            <div>
              <p style={{display: 'flex', justifyContent: 'space-between'}}>
                {project.project_title}{' '}
                <spam>
                  <input type='checkbox' />
                </spam>
              </p>
              <p style={{display: 'flex', justifyContent: 'space-between'}}>
                {projectVisibilitySettings[index].showDates && (
                  <p style={{paddingTop: '1%'}}>
                    {formatDate(project.start_date)} - {formatDate(project.end_date)}
                  </p>
                )}
                {projectVisibilitySettings[index].showDuration && (
                  <p style={{paddingTop: '1%'}}>
                    {formatMonthYear(project.start_date)} - {formatMonthYear(project.end_date)}{' '}
                    {'('}
                    {calculateDuration(project.start_date, project.end_date)} {')'}
                  </p>
                )}
                {projectVisibilitySettings[index].showNothing && <p></p>}
                <span>
                  <select
                    style={{backgroundColor: 'white'}}
                    onChange={(e) => handleSelectChange(e, index)}
                  >
                    <option>Show Dates</option>
                    <option>Show Duration</option>
                    <option>Show Nothing</option>
                  </select>
                </span>
              </p>
            </div>
          ) : (
            <div className='form-container'>
              <div className='form-section' style={{position: 'relative'}}>
                <div className='form-section'>
                  <label style={{fontWeight: 'bold'}}>Project Title</label>
                </div>
                <input
                  type='text'
                  defaultValue={project.project_title}
                  onChange={(e) => setProjectTitle(e.target.value)}
                />
                {/* <select
                  defaultValue={project.project_title} // Use the stored selected project title to reflect the selected option
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
                  <option defaultValue='project.project_title' selected>
                    {project.project_title}
                  </option>
                </select> */}
              </div>
              <div className='form-section' style={{display: 'flex', alignItems: 'center'}}>
                <div style={{flex: 1, marginRight: '1rem'}}>
                  <label style={{fontWeight: 'bold'}}>Start Date</label>
                  <input
                    type='date'
                    defaultValue={new Date(project.start_date).toISOString().split('T')[0]}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                {console.log(project)}
                <div style={{flex: 1, marginLeft: '1rem'}}>
                  <label style={{fontWeight: 'bold'}}>End Date</label>
                  <input
                    type='date'
                    defaultValue={
                      isCurrent ? '' : new Date(project.end_date).toISOString().split('T')[0]
                    } // Display the appropriate value based on isCurrent state
                    onChange={(e) => setEndDate(e.target.value)}
                    disabled={isCurrent} // Disable the input when the checkbox is checked
                  />
                </div>
              </div>
              <div className='form-section' style={{display: 'flex', alignItems: 'center'}}>
                <div style={{flex: 2, marginRight: '1rem'}}>
                  <input
                    type='checkbox'
                    style={{
                      width: '20px',
                      height: '20px',
                      marginLeft: '55%',
                      marginRight: '2%',
                    }}
                    checked={project.current | isCurrent} // Reflect the checkbox status
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
                    defaultValue={project.project_url}
                    onChange={(e) => setProjectURL(e.target.value)}
                    placeholder='Enter project url'
                  />
                </div>
                <div style={{flex: 1, marginLeft: '1rem'}}>
                  <label style={{fontWeight: 'bold'}}>Client Name</label>
                  <input
                    type='text'
                    defaultValue={project.client_name}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder='Enter client name'
                  />
                </div>
              </div>
              <div className='form-section' style={{position: 'relative'}}>
                <div className='form-section'>
                  <label style={{fontWeight: 'bold'}}>Organization Name</label>
                </div>
                {/* <select
                  value={project.organization_name}
                  onChange={(e) => setOrganizationName(e.target.value)}
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
                  <option value='project.organization_name' selected>
                    {project.organization_name}
                  </option>
                </select> */}
                <input
                  type='text'
                  defaultValue={project.organization_name}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder='Enter Organization Name'
                />
              </div>
              <div className='col control-section e-rte-custom-tbar-section' id='rteCustomTool '>
                <div className='col control-section e-rte-custom-tbar-section' id='rteCustomTool '>
                  <div className='rte-control-section'>
                    <label style={{fontWeight: 'bold'}}>Project Summary</label>
                    <RichTextEditorComponent
                      ref={(richtexteditor) => {
                        rteObj.current = richtexteditor
                      }}
                      valueTemplate={project.project_summary}
                      change={(args) => setProjectSummary(args.value)}
                      // change={(args) => onratechange('project_summary', args.value)}
                      // backgroundColor={{white}}
                      style={{width: '100%'}}
                      height='237px'
                      id='defaultRTE'
                      toolbarSettings={toolbarSettings1} // Use the appropriate toolbar settings
                    >
                      <Inject services={[Toolbar]} />
                    </RichTextEditorComponent>
                  </div>
                </div>
                <div style={divStyle}>
                  <h6 style={{marginTop: '3%'}}>Technologies</h6>
                  <div
                    id='skillInput'
                    onInput={onInputChanged}
                    contentEditable={true}
                    style={{height: '55px', border: '1px solid #ccc'}}
                  ></div>
                  <br />
                  <br />
                  <p style={{marginTop: '-27px'}}>
                    Suggestions &nbsp;
                    {renderSuggestions(
                      filteredSkills,
                      'badge badge-pill badge-secondary text-dark badge-sm mx-1'
                    )}
                  </p>
                </div>
                <div className='form-section'>
                  <label style={{fontWeight: 'bold', marginTop: '-2%'}}>Technology Stack</label>
                  <div className='rte-control-section'>
                    <RichTextEditorComponent
                      ref={(richtexteditor) => {
                        rteObj.current = richtexteditor
                      }}
                      valueTemplate={project.technology_stack}
                      change={(args) => setTechnologyStack(args.value)}
                      width='100%'
                      height='237px'
                      id='technologyStackRTE'
                      toolbarSettings={toolbarSettings1}
                      customStyle={customToolbarStyles}
                    >
                      <Inject services={[Toolbar]} />
                    </RichTextEditorComponent>
                  </div>
                </div>
                <div className='form-section'>
                  <label style={{fontWeight: 'bold'}}>Roles & Responsibility</label>
                  <div className='rte-control-section'>
                    <RichTextEditorComponent
                      ref={(richtexteditor) => {
                        rteObj.current = richtexteditor
                      }}
                      valueTemplate={project.roles_and_responsibility}
                      change={(args) => setRolesAndResponsibility(args.value)}
                      width='100%'
                      height='237px'
                      id='rolesResponsibilityRTE'
                      toolbarSettings={toolbarSettings1}
                    >
                      <Inject services={[Toolbar]} />
                    </RichTextEditorComponent>
                  </div>
                </div>
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
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => toggleContent(index)}
          >
            {showFormForProject[index] ? (
              <FontAwesomeIcon icon={faCaretUp} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
          </div>

          {/* Other buttons (Update, Delete) based on the form visibility */}
          {!showFormForProject[index] && (
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <button
                className='btn btn-sm btn-dark'
                style={{backgroundColor: 'black', marginRight: '10px'}}
                onClick={() => handleUpdate(index)}
              >
                <FontAwesomeIcon icon={faEdit} /> Update
              </button>
              <button
                className='btn btn-sm btn-dark'
                style={{backgroundColor: 'black'}}
                onClick={() => handleDelete(index)}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default SavedProjectContent
