import React, {useState, useRef, useEffect} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  Sort,
  Toolbar,
  Search,
  PageSettingsModel,
  SearchSettingsModel,
} from '@syncfusion/ej2-react-grids'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faUndo} from '@fortawesome/free-solid-svg-icons'
import {DropDownButtonComponent} from '@syncfusion/ej2-react-splitbuttons'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {Card} from 'react-bootstrap-v5'
import axios from 'axios'
import '@syncfusion/ej2-react-grids/styles/material.css' // Adjust the theme as needed
import {Link} from 'react-router-dom'
// import {getProjectMaster} from '../../../../Store/App/Manager/getProjectMaster'
import {useDispatch, useSelector} from 'react-redux'
import {getProjectMaster} from '../../../../Store/App/Manager/getProjectMaster'
import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons'
import deleteProjectMaster from '../../../../Store/App/Manager/deleteProjectMaster'
import deleteEmployeeProject from '../../../../Store/App/Manager/deleteEmployeeProject'

const AllProjects = () => {
  const [searchText, setSearchText] = useState('')
  const gridInstance = useRef('')
  const [showModal, setShowModal] = useState(false)
  // const [data, setData] = useState([])

  const [projectDescription, setProjectDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [status, setStatus] = useState('')

  const handleClearSearch = () => {
    setSearchText('')
    if (gridInstance.current) {
      console.log('Grid Instance:', gridInstance.current)
      gridInstance.current.search('')
    }
  }

  const handleSearch = () => {
    console.log('Searching for:', searchText)
    if (gridInstance.current) {
      gridInstance.current.search(searchText)
    }
  }

  const pageOptions = {
    pageSize: 4,
    pageSizes: true,
    pageCount: 5, // Set the number of pages to display in the pager
  }

  const searchSettings = {
    fields: ['project_title', 'start_date', 'end_date', 'modified_by', 'modified_on'],
  }

  const dispatch = useDispatch()
  const data = useSelector((state) => state.getProjectMaster.projectMaster) // Adjust the state path as needed

  useEffect(() => {
    // Dispatch the action to fetch projects when the component mounts
    dispatch(getProjectMaster())
  }, [dispatch])

  const ChangesTemplate = (props) => {
    return (
      <div>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => {
            setProjectDescription(props.projectDescription)
            setStartDate(props.startDate)
            setEndDate(props.endDate)
            setStatus(props.status)
            setShowModal(true)
          }}
        >
          View
        </button>
      </div>
    )
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const gridContainerStyle = {
    // boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    padding: '2%',
    backgroundColor: '#fff',
    borderRadius: '5px',
    width: '97%', // Change to 100% to occupy the full width
    margin: 'auto', // Center the grid
    marginTop: '1%', // Adjust the top margin
  }

  const gridStyle = {
    width: '97%',
    marginLeft: '-2%',
    marginTop: '1%',
  }

  const resetGrid = () => {
    setSearchText('')
    if (gridInstance.current) {
      gridInstance.current.search('')
      // gridInstance.current.pageSettings.pageSize = 4
      // gridInstance.current.clearSorting()
    }
  }
  let serialNumberCounter = 0;
  
  const rowDataBound = (args) => {
    // Increment the counter for each row
    serialNumberCounter++;
    args.row.cells[0].innerHTML = `<div>${serialNumberCounter}</div>`;
  };


  // const queryCellInfo = (args) => {
  //   if (args.column && args.column.field === 'S.No') {
  //     const index = data.indexOf(args.data) + 1
  //     args.cell.innerHTML = `<div>${index}</div>`
  //   }
  // }
  // useEffect(() => {
  //   const apiUrl = 'http://localhost:8082/api/projects/all';
  //   axios
  //     .get(apiUrl)
  //     .then((response) => {
  //       const formattedData = response.data.map((item) => ({
  //         ...item,
  //         startDate: new Date(item.startDate).toLocaleString(),
  //         endDate: new Date(item.endDate).toLocaleString(),
  //       }));
  //       setData(formattedData);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  const ProjectNameTemplate = (props) => (
    <div>
      <Link to={`/editpro/${props.project_master_id}`}>{props.project_title}</Link>
    </div>
  )

  const ActionsTemplate = (props) => (
    <div style={{marginRight: '29%'}}>
      {/* Edit icon */}
      <FontAwesomeIcon icon={faPen}  onClick={() => handleEdit(props)} style={{cursor: 'pointer'}} />

      {/* Delete icon */}
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => handleDelete(props)}
        style={{border: 'none', outline: 'none', marginLeft: '8px', cursor: 'pointer'}}
      />
    </div>
  )
  

  const handleEdit = (props) => {
    // Implement your logic for handling edit action
    console.log('Edit clicked for project:', props.projectTitle)
    // Add your code to handle the edit action (e.g., navigate to edit page)
  }

  const handleDelete = (props) => {
    const projectIdToDelete = props.project_master_id
    alert(projectIdToDelete.type)
    // Dispatch the delete action here
    dispatch(deleteProjectMaster(projectIdToDelete))
  }

  return (
    <>
      <PageTitle>All Projects</PageTitle>
      <div style={gridContainerStyle}>
        <div
          style={{
            textAlign: 'left',
            marginBottom: '-20px',
            border: '1px solid #ccc',
            width: '100%', // Set to 100% for better visibility
            borderBottom: 'none',
            marginTop: '0%',
            marginLeft: '-2%',
          }}
        >
          <div style={{position: 'relative', width: '50%', marginLeft: '2%', marginTop: '2%'}}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: '400px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{padding: '10px', color: '#aaa'}} />
              <input
                type='text'
                placeholder='Search...'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{padding: '10px', width: '100%', border: 'none', outline: 'none'}}
              />
              <button
                style={{
                  cursor: 'pointer',
                  color: 'black',
                  border: '3px solid #ccc',
                  padding: '10px',
                  backgroundColor: '#ccc',
                  marginLeft: '-1px',
                }}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            {searchText && (
              <div
                style={{
                  position: 'absolute',
                  marginTop: '-8px',
                  marginLeft: '56%',
                  top: '50%',
                  cursor: 'pointer',
                }}
                onClick={handleClearSearch}
              >
                &#x2716;
              </div>
            )}
          </div>
          <span
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '-3%',
              marginRight: '1%',
            }}
          >
            {/* <DropDownButtonComponent style={{border: 'none', width: '11%'}}>
              {' '}
              Filters
            </DropDownButtonComponent> */}
            <button
              style={{
                cursor: 'pointer',
                color: 'black',
                border: 'none',
                backgroundColor: 'transparent',
                marginLeft: '-20px',
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={resetGrid}
            >
              Reset &nbsp; <FontAwesomeIcon icon={faUndo} style={{marginRight: '3px'}} />
            </button>
          </span>
        </div>
        {
          <GridComponent
            ref={gridInstance}
            dataSource={data} // Use the fetched data here
            allowPaging={true}
            pageSettings={pageOptions}
            width='100%'
            style={gridStyle}
            allowSorting={true}
            searchSettings={searchSettings}
            rowDataBound={rowDataBound}
          >
            <ColumnsDirective>
              <ColumnDirective
                headerText='S.No.'
                width='70' // Adjust the width as needed
                textAlign='Center'
              />
              <ColumnDirective
                field='project_title'
                textAlign='Left'
                headerText='Project Name'
                width='110' // Adjust the width as needed
                template={ProjectNameTemplate}
              />
              {/* <ColumnDirective
                field="projectDescription"
                headerText="Project Description"
                allowSorting={true}
                width="200" // Adjust the width as needed
                textAlign="Left"
              /> */}
              <ColumnDirective
                field='start_date'
                headerText='Start Date'
                width='90' // Adjust the width as needed
                textAlign='Left'
              />
              <ColumnDirective
                field='end_date'
                headerText='End Date'
                width='90' // Adjust the width as needed
                textAlign='Left'
              />
              {/* <ColumnDirective
                field='users'
                headerText='Employees'
                width='90' // Adjust the width as needed
                textAlign='Left'
              /> */}
              <ColumnDirective
                field='modified_by'
                textAlign='Center'
                headerText='Modified By'
                width='100' // Adjust the width as needed
              />
              <ColumnDirective
                field='modified_on'
                textAlign='Center'
                headerText='Modified On'
                width='100' // Adjust the width as needed
              />
              <ColumnDirective
                field='Actions'
                textAlign='Center'
                headerText='Actions'
                width='80'
                template={ActionsTemplate} // Use the custom template for Actions column
              />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Toolbar, Search]} />
          </GridComponent>
        }
      </div>
    </>
  )
}

export default AllProjects
