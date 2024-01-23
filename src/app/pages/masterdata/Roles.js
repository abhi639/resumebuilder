import React, {FC, useState, useEffect, useRef} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faUndo, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {DropDownListComponent, DropDownButtonComponent} from '@syncfusion/ej2-react-dropdowns'
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
import {useDispatch, useSelector} from 'react-redux'
import {getRoles} from '../../../Store/App/Admin/getRoles.js'
import {addroles} from '../../../Store/App/Admin/addRole'
import {editRoles} from '../../../Store/App/Admin/getRoles.js'
import {deleteroles} from '../../../Store/App/Admin/deleteRole'
import {format} from 'date-fns'
import './master.css'
import {Link} from 'react-router-dom'
import {downloadFile} from '../../../Store/App/Common/downloadTemplate.js'

function formatDateTime(date) {
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss')
}

const Roles = () => {
  const [searchText, setSearchText] = useState('')
  const [selectedOption, setSelectedOption] = useState('Roles')
  const [filteredData, setFilteredData] = useState([])
  const gridInstance = useRef(null)

  const store = useSelector((state) => state)
  const roles = useSelector((state) => state.newRoles)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRoles())
  }, [])

  useEffect(() => {
    const mappedData = roles.roles.map((role) => ({
      S_No: role.role_id,
      role_name: role.role_name,
      Modified_On: role.modifiedOn,
      Modified_By: role.modifiedBy,
    }))
    setFilteredData(mappedData)
  }, [roles])

  const commonContainerStyle = {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '10px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '1%',
    color: 'blue',
    border: '1px solid #ccc',
    marginLeft: '1%',
    marginRight: '1%',
    border: 'none',
    backgroundColor: '#eaeff2',
  }

  const gridStyle = {
    border: 'none',
  }

  const toolbarOptions1 = {
    border: 'none',
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
    maxWidth: '400%',
    border: '1px solid #ccc',
    borderRadius: '1px',
    marginRight: '0px',
    color: 'black',
  }

  const pageOptions = {
    pageSize: 10,
    pageSizes: true,
  }
  const editOptions = {allowEditing: true, allowAdding: true, allowDeleting: true}
  const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel']

  const searchSettings = {
    fields: ['Roles'],
  }

  const handleSearch = () => {
    if (gridInstance.current) {
      const filtered = filteredData.filter((item) => {
        const role = item.role_name ? item.role_name.toLowerCase() : ''
        return role.includes(searchText.toLowerCase())
      })
      setFilteredData(filtered)
      if (gridInstance.current) {
        gridInstance.current.dataSource = filtered
        gridInstance.current.refresh()
      }
    }
  }

  const handleReset = () => {
    setSearchText('')
    setSelectedOption('Roles')

    if (gridInstance.current) {
      gridInstance.current.refresh()
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

  const paginationBlockStyle = {
    marginTop: '10px',
  }

  const handleClearSearch = () => {
    setSearchText('')
  }

  const handleAdd = () => {
    console.log('handleadd')
  }

  const handleToolbarClick = (args) => {
    if (args.item.id.toLowerCase().includes('add')) {
      console.log('Add button clicked')
    } else if (args.item.id.toLowerCase().includes('update')) {
      console.log('update button clicked')
      handleUpdate(args)
      dispatch(getRoles())
    } else if (args.item.id.toLowerCase().includes('edit')) {
      console.log('Edit button clicked')
      handleEdit(args)
    } else if (args.item.id === 'Delete') {
      console.log('Delete button clicked')
      handleDelete(args)
    }
  }

  const dataSourceChanged = (args) => {
    console.log(args.actionArgs?.data?.role_name)
    if (args.actionArgs?.data?.role_name) {
      dispatch(addroles({role_name: args.actionArgs?.data?.role_name}))
      dispatch(getRoles())
      const updatedFilteredData = [...filteredData]
      const newRole = {
        S_No: filteredData.length + 1,
        role_name: args.actionArgs.data.role_name,
        Modified_On: formatDateTime(new Date()),
        Modified_By: 'admin',
      }
      updatedFilteredData.push(newRole)
      setFilteredData(updatedFilteredData)
    }
  }

  const handleEdit = (args) => {
    const updatedRoleName = getValue('role_name', args.data)
    const updatedSNo = getValue('S_No', args.data)

    if (args.data && updatedSNo) {
      dispatch(
        editRoles({
          role_id: updatedSNo,
          role_name: updatedRoleName,
        })
      ).then(() => {
        dispatch(getRoles())
      })
    }
  }

  const handleDelete = (args) => {
    const selectedRole = getValue('role_name', args.data)
    const selectedSNo = getValue('S_No', args.data)

    dispatch(deleteroles(selectedRole))

    const updatedFilteredData = filteredData.filter((item) => item.role_name !== selectedRole)
    const adjustedData = updatedFilteredData.map((item, index) => ({...item, S_No: index + 1}))
    setFilteredData(adjustedData)

    if (gridInstance.current) {
      gridInstance.current.dataSource = adjustedData
      gridInstance.current.refresh()
    }
  }

  const handleUpdate = (args) => {
    const updatedRoleName = getValue('role_name', args.data)
    const updatedSNo = getValue('S_No', args.data)

    if (args.data && updatedSNo) {
      dispatch(
        editRoles({
          role_id: updatedSNo,
          role_name: updatedRoleName,
        })
      ).then(() => {
        dispatch(getRoles()).then(() => {
          const updatedFilteredData = roles.roles.map((role) => ({
            S_No: role.role_id,
            role_name: role.role_name,
            Modified_On: role.modifiedOn,
            Modified_By: role.modifiedBy,
          }))
          setFilteredData(updatedFilteredData)
          if (gridInstance.current) {
            gridInstance.current.dataSource = updatedFilteredData
            gridInstance.current.refresh()
          }
        })
      })
    }
  }

  const handleCancel = () => {
    // Perform logic for canceling the edit operation
    // This might involve reverting changes or resetting the form
  }

  const resetGrid = () => {
    if (gridInstance.current) {
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
          to='/uploadroles'
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
          toolbarSettings={toolbarOptions1}
        >
          <ColumnsDirective>
            <ColumnDirective
              field='S_No'
              headerText='Sr.No'
              width='70'
              allowEditing={false}
              template={(props) => <div style={{marginLeft: '3px'}}>{props.S_No}</div>}
            />
            {selectedOption === 'Roles' ? (
              <ColumnDirective field='role_name' headerText='Roles' width='130' textAlign='Left' />
            ) : (
              <ColumnDirective field='Technology' headerText='Technology' width='130' />
            )}
            <ColumnDirective
              field='Modified_On'
              headerText='Modified On'
              width='150'
              allowEditing={false}
              template={(props) => {
                if (props.Modified_On) {
                  const formattedDate = formatDateTime(props.Modified_On)
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
              field='Modified_By'
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

export default Roles
