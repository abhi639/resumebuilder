import * as React from 'react'
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Edit,
  CommandColumn,
  Toolbar,
  Sort,
  PagerDropDown,
} from '@syncfusion/ej2-react-grids'

import {PageTitle} from '../../../../_metronic/layout/core'

import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import {useSelector} from 'react-redux'
import './template.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faUndo} from '@fortawesome/free-solid-svg-icons'
import {DropDownButtonComponent} from '@syncfusion/ej2-react-splitbuttons'
const Addtemplate = () => {
  const history = useHistory()
  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    allowEditOnDblClick: false,
  }

  const editparams = {params: {popupHeight: '300px'}}
  const validationRule = {required: true}
  const commands = [
    {
      buttonOption: {
        type: 'Eye',
        cssClass: 'e-small e -fill e-flat',
        iconCss: 'e-eye e-icons',
      },
    },
    {
      buttonOption: {
        type: 'Edit',
        cssClass: 'e-small e -fill e-flat',
        iconCss: 'e-edit e-icons',
      },
    },
    {
      type: 'Delete',
      buttonOption: {
        type: 'Delete',
        cssClass: 'e-small e-flat',
        iconCss: 'e-delete e-icons',
      },
    },
  ]
  const [searchText, setSearchText] = React.useState('')
  const gridInstance = React.useRef(null)

  const handleClearSearch = () => {
    setSearchText('');
    if (gridInstance.current) {
      gridInstance.current.search('');
    }
  };

  const handleSearch = () => {
    if (gridInstance.current) {
      gridInstance.current.search(searchText)
    }
  }

  const pageOptions = {
    pageSize: 10,
    pageSizes: true,
    pageCount: 5, // Set the number of pages to display in the pager
  }

  const searchSettings = {
    fields: ['template_id', 'template_name', 'modified_on', 'modified_by'],
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
      gridInstance.current.pageSettings.pageSize = 4
      gridInstance.current.clearSorting()
    }
  }
  const commandClick = (args) => {
    switch (args.commandColumn.buttonOption.type) {
      case 'Delete':
        console.log('template id', args.rowData.template_id)
        handleDelete(args.rowData.template_id)
        break
      case 'Edit':
        const iddata = {id: args.rowData.template_id}

        console.log(args.rowData.template_id)
        history.push('/editTemplate', {iddata})
        break
      default:
        console.log('default')
    }
  }
  const user = useSelector(({auth}) => auth)
  console.log('user', user)
  console.log('idtoken', user.accessToken)
  const [post, setPost] = React.useState(null)
  React.useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`, // Replace with your actual authorization header
      },
    }
    axios.get('http://localhost:8082/templates/getallTemplates', config).then((response) => {
      setPost(response.data)
    })
  }, [])

  console.log('posts=', post)
  const searchContainerStyle = {
    textAlign: 'left',
    marginBottom: '-5px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '14px',
  }
  let grid

  const handleDelete = (template_id) => {
    console.log('id', template_id)
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`, // Replace with your actual authorization header
      },
    }
    // Send an HTTP request to delete the item with the given ID
    axios
      .delete(`http://localhost:8082/templates/deleteTemplate/${template_id}`, config)

      .then((response) => {
        // Update the data source after successful deletion
        if (response.status === 200) {
          setPost((prevData) => prevData.filter((item) => item.template_id !== template_id))
        }
      })
      .catch((error) => {
        // Handle any error that occurs during deletion
        console.error('Delete failed:', error)
      })
  }
  // Add a click event listener to the reset button
  function Onreset() {
    const searchInput = document.getElementById('template_name')
    const resetButton = document.getElementById('resetButton')

    // Clear the text in the search input
    searchInput.value = ''
  }

  const rowDataBound = (args) => {
    // Add a dynamic serial number to each row
    const index = post.indexOf(args.data) + 1
    args.row.cells[0].innerHTML = `<div>${index}</div>`
  }
  return (
    <>
      <PageTitle>All Templates</PageTitle>
      <div style={gridContainerStyle}>
        <div
          style={{
            textAlign: 'left',
            marginBottom: '-20px',
            border: '1px solid #ccc',
            width: '98%', // Set to 100% for better visibility
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
            commandClick={commandClick}
            id='gridcomp'
            ref={gridInstance}
            dataSource={post}
            allowPaging={true}
            pageSettings={pageOptions}
            width='98%' // Set to 100% for better visibility
            style={gridStyle}
            allowSorting={true}
            searchSettings={searchSettings}
            rowDataBound={rowDataBound}
          >
            <ColumnsDirective>
              <ColumnDirective
                headerText='Sr.No'
                width='12%'
                headerTextAlign='Center'
                textAlign='Center'
              ></ColumnDirective>
              <ColumnDirective
                field='template_name'
                headerText='Template'
                width='20%'
                editType='dropdownedit'
                edit={editparams}
              ></ColumnDirective>
              <ColumnDirective
                field='modified_on'
                headerText='Modified On'
                editType='datepickeredit'
                format='yMd'
                width='30%'
              ></ColumnDirective>
              <ColumnDirective
                field='modified_by'
                headerText='Modified By'
                width='20%'
                validationRules={validationRule}
              ></ColumnDirective>
              <ColumnDirective
                headerText='Action'
                width='20%'
                headerTextAlign='Center'
                textAlign='Center'
                commands={commands}
              ></ColumnDirective>
            </ColumnsDirective>

            <Inject services={[Toolbar, Page, CommandColumn, Sort, Edit]} />
          </GridComponent>
        }
      </div>
    </>
  )
}

export default Addtemplate
