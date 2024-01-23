import React, {FC, useState, useEffect, useRef} from 'react'

import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Toolbar,
  Edit,
  Search,
  Page,
} from '@syncfusion/ej2-react-grids'
import {getValue} from '@syncfusion/ej2-base'
import {data} from '../layout-builder/data.js' // Import your data source here
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from 'react-redux'
import {getTechnologies} from '../../../Store/App/Admin/getTechnologies.js'
import {addTechnology} from '../../../Store/App/Admin/addTechnology.js'
import {editTechnology} from '../../../Store/App/Admin/editTechnology.js'
import {deleteTechnology} from '../../../Store/App/Admin/deleteTechnology' // Update the path to the correct location of the deleteTechnology file
import {format} from 'date-fns'
import {Link} from 'react-router-dom'
import {downloadFile} from '../../../Store/App/Common/downloadTemplate.js'

function formatDateTime(date) {
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss')
}

const Technology = () => {
  const [searchText, setSearchText] = useState('')
  const [selectedOption, setSelectedOption] = useState('Technology') // Initially 'Technology' is selected
  const [filteredData, setFilteredData] = useState([]) // Initialize with an empty array
  const gridInstance = useRef(null)

  const store = useSelector((state) => state)

  const technologies = useSelector((state) => state.technology)

  console.log('technologies', technologies)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTechnologies())
  }, [])

  useEffect(() => {
    if (technologies) {
      const mappedData = technologies.technologies.map((technology) => ({
        S_No: technology.technology_id, // Change 'id' to the actual property in your technologies data
        Technology: technology.technology_name, // Change 'technology_name' to the actual property in your technologies data
        modifiedOn: technology.modifiedOn, // Assuming technology object has a property named 'modified_on'
        modifiedBy: technology.modifiedBy,
      }))
      setFilteredData(mappedData)
    }
    // Map the technologies data to match the structure expected by filteredData
  }, [technologies])

  // const formattedData = data.map((item) => ({
  //   ...item,
  //   Modified_On: formatDateTime(item.Modified_On),
  // }))

  const commonContainerStyle = {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '10px', // Add margin at the bottom
    // boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '1%',
    color: 'blue',
    border: '1px solid #ccc', // Add border for the container
    marginLeft: '1%',
    marginRight: '1%',
    border: 'none',
    backgroundColor: '#eaeff2',
  }

  const searchContainerStyle = {
    textAlign: 'left',
    marginBottom: '-3%',
    display: 'flex',
    alignItems: 'center',
  }

  const searchInputStyle = {
    padding: '10px',
    width: '100%',
    maxWidth: '400%', // Increase the width of the search box
    border: '1px solid #ccc',
    borderRadius: '1px',
    marginRight: '0px',
    color: 'black',
  }

  const gridStyle = {
    border: 'none',
  }

  const pageOptions = {
    pageSize: 10,
    pageSizes: true,
  }
  const editOptions = {allowEditing: true, allowAdding: true, allowDeleting: true}
  const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel']

  const searchSettings = {
    fields: ['Technology'],
  }

  const handleSearch = () => {
    if (gridInstance.current && searchText && selectedOption) {
      const filtered = filteredData.filter((item) => {
        const selectedValue = item[selectedOption]
        return selectedValue && selectedValue.toLowerCase().includes(searchText.toLowerCase())
      })
      setFilteredData(filtered)
      if (gridInstance.current) {
        gridInstance.current.dataSource = filtered
        gridInstance.current.refresh() // Refresh the grid to apply the filter
      }
    }
  }

  const handleReset = () => {
    setSearchText('')
    setSelectedOption('Technology')
    setFilteredData(data) // Reset to the full data
    if (gridInstance.current) {
      gridInstance.current.refresh() // Refresh the grid to clear the filter
    }
  }

  const handleDownloadTemplate = () => {
    try {
      dispatch(downloadFile())
    } catch {
      console.error('Error downloading file:')
    }
  }

  const bulkUploadButtonStyle = {
    background: 'black',
    color: 'white',
  }

  const handleClearSearch = () => {
    setSearchText('')
  }

  const handleAdd = () => {
    if (addedRecord && addedRecord.Technology) {
      // Dispatch an action to add the technology to the API
      dispatch(addTechnology({technology_name: addedRecord.Technology}))

      // Update the filtered data state
      const updatedFilteredData = [...filteredData]
      const newTechnology = {
        S_No: filteredData.length + 1,
        Technology: addedRecord.Technology,
        modifiedOn: formatDateTime(new Date().toString()),
        modifiedBy: '',
      }
      updatedFilteredData.push(newTechnology)
      setFilteredData(updatedFilteredData)
      setAddedRecord(null) // Reset the addedRecord state
    }
  }

  const handleToolbarClick = (args) => {
    if (args.item.id.toLowerCase().includes('add')) {
      // The 'Add' button was clicked
      console.log('Add button clicked')
      // You can dispatch an action, show a modal, or perform any other actions as needed.
    } else if (args.item.id.toLowerCase().includes('update')) {
      console.log('update button clicked', args)
      handleUpdate(args)
      dispatch(getTechnologies()) // Refresh the technologies grid after update
    } else if (args.item.id === 'Edit') {
      // The 'Edit' button was clicked
      console.log('Edit button clicked')
      // Handle the Edit action
    } else if (args.item.id === 'Delete') {
      // The 'Delete' button was clicked
      console.log('Delete button clicked')
      handleDelete(args)
    }
  }

  const [addedRecord, setAddedRecord] = useState(null) // Specify the type

  const dataSourceChanged = (args) => {
    console.log('Technology name' + args.actionArgs?.data?.Technology)
    if (args.actionArgs?.data?.Technology) {
      dispatch(addTechnology({technology_name: args.actionArgs?.data?.Technology}))
      dispatch(getTechnologies()) // Refresh the technologies grid after adding a new technology

      // Update the filtered data state
      const updatedFilteredData = [...filteredData]
      const newTechnology = {
        S_No: filteredData.length + 1, // Assuming S_No starts from 1
        Technology: args.actionArgs?.data?.technology_name,
        modifiedOn: formatDateTime(new Date().toString()), // Assuming the modified date is the current date
        modifiedBy: '', // Replace with the actual modified user
      }
      updatedFilteredData.push(newTechnology)
      setFilteredData(updatedFilteredData)
    }
  }

  // Call handleUpdate outside the dataSourceChanged handler

  // Edit
  const handleEdit = () => {
    // Perform logic for editing an entry
    // Dispatch an action to update the edited entry in the API
  }

  const handleDelete = (args) => {
    if (args && args.data && args.data.Technology) {
      const selectedTechnology = args.data.Technology // Assuming 'Technology' is the field containing the technology name
      const selectedSNo = getValue('S_No', args.data) // Assuming 'S_No' is the field containing the serial number

      // Dispatch an action to delete the technology from the API
      dispatch(deleteTechnology(selectedTechnology)) // Replace 'deleteTechnology' with the actual action for deleting the technology

      // Update the filtered data state and adjust serial numbers
      const updatedFilteredData = filteredData.filter(
        (item) => item.Technology !== selectedTechnology
      )
      const adjustedData = updatedFilteredData.map((item, index) => ({...item, S_No: index + 1}))
      setFilteredData(adjustedData)

      if (gridInstance.current) {
        gridInstance.current.dataSource = adjustedData
        gridInstance.current.refresh()
      }
    } else {
      console.error('Invalid data format received for deletion.')
    }
  }

  // Update
  const handleUpdate = (args) => {
    if (args && args.rowData && args.rowData.Technology) {
      const updatedTechnology = args.rowData // Fetch the updated technology data
      console.log(updatedTechnology)
      // Dispatch an action to update the technology in the backend
      dispatch(editTechnology(updatedTechnology)) // Make sure to implement the 'editTechnology' action

      // Refresh the technologies grid after the update
      dispatch(getTechnologies())
    } else {
      console.error('Invalid data format received for update.')
    }
  }

  // ... (previous code remains unchanged)

  // Cancel
  const handleCancel = () => {
    // Perform logic for canceling the edit operation
    // This might involve reverting changes or resetting the form
  }

  const resetGrid = () => {
    // Assuming gridInstance.current exists and it is the reference to your grid
    if (gridInstance.current) {
      // Reset the grid to its initial state
      gridInstance.current.dataSource = filteredData
      gridInstance.current.refresh()
    }
  }
  return (
    <div style={commonContainerStyle}>
      <div style={searchContainerStyle}>
        <div style={{position: 'relative', width: '25%'}}>
          <FontAwesomeIcon
            icon={faSearch}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#aaa',
            }}
          />
          <input
            type='text'
            placeholder={`Search by ${selectedOption === 'Roles' ? 'Roles' : 'Technology'}`}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              ...searchInputStyle,
              paddingLeft: '15%',
            }}
          />
        </div>
        <button
          style={{
            cursor: 'pointer',
            color: 'black',
            // border: '3px solid #ccc',
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
            marginTop: '-87px',
            marginLeft: '16%',
            top: '50%',
            cursor: 'pointer',
          }}
          onClick={handleClearSearch}
        >
          &#x2716;
        </div>
      )}

      <div style={{display: 'flex', justifyContent: 'flex-end', marginLeft: '70%'}}>
        <Link
          to='/uploadtech'
          className='btn btn-sm '
          data-bs-target=''
          id='kt_toolbar_primary_button fw-bolder'
          style={{
            ...bulkUploadButtonStyle,
          }}
        >
          Bulk Upload
        </Link>
        <button
          className='btn btn-sm btn-flex '
          onClick={handleDownloadTemplate}
          style={{
            border: '1px solid black',
            marginLeft: '10%',
          }}
        >
          Download Template
        </button>
      </div>
      {filteredData.length > 0 && (
        <GridComponent
          ref={gridInstance}
          dataSource={filteredData}
          allowPaging={true}
          pageSettings={pageOptions}
          width='60%'
          style={gridStyle}
          editSettings={editOptions}
          toolbar={toolbarOptions}
          searchSettings={searchSettings}
          toolbarClick={handleToolbarClick}
          beforeDataBound={dataSourceChanged}
        >
          <ColumnsDirective>
            <ColumnDirective
              field='S_No'
              headerText='Sr.No'
              width='70'
              allowEditing={false}
              template={(props) => <div style={{marginLeft: '3px'}}>{props.S_No}</div>}
            />

            <ColumnDirective field='Technology' headerText='Technology' width='130' />

            <ColumnDirective
              field='modifiedOn'
              headerText='Modified On'
              width='150'
              allowEditing={false}
              template={(props) => {
                if (props.modifiedOn) {
                  const formattedDate = formatDateTime(props.modifiedOn)
                  const [date, time] = formattedDate.split(' ')
                  return (
                    <span>
                      {date} , {time}
                    </span>
                  )
                } else {
                  return <span>-</span>
                }
              }}
            />
            <ColumnDirective
              field='modifiedBy'
              headerText='Modified By'
              allowEditing={false}
              width='150'
            />
          </ColumnsDirective>
          <Inject services={[Page, Edit, Toolbar, Search]} />
        </GridComponent>
      )}
    </div>
  )
}

export default Technology
