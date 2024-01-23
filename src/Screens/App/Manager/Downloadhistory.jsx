import React, {useState, useRef} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faUndo,
  faTrash,
  faDownload,
  faCaretDown,
  faCloudArrowDown,
} from '@fortawesome/free-solid-svg-icons'
import {historydata} from './historydata'
import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
  Inject,
  Page,
  Sort,
  Toolbar,
  Search,
} from '@syncfusion/ej2-react-grids'
import './downloadhistory.css'
import {DropDownButtonComponent} from '@syncfusion/ej2-react-splitbuttons'

const Downloadhistory = () => {
  const [searchText, setSearchText] = useState('')
  const gridInstance = useRef(null)
  const [showModal, setShowModal] = useState(false)

  const handleClearSearch = () => {
    setSearchText('')
  }

  const handleSearch = () => {
    if (gridInstance.current && searchText) {
      gridInstance.current.search(searchText)
    }
  }

  const resetGrid = () => {
    setSearchText('')
    if (gridInstance.current) {
      gridInstance.current.search('')
      gridInstance.current.pageSettings.pageSize = 4
    }
  }

  const gridContainerStyle = {
    // boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '5px',

  }

  const gridStyle = {
    marginTop: '20px',
    width: '80%', // Adjust the width of the grid as needed
  }

  const ActionsTemplate = (props) => {
    const iconSize = '1.5x' // Adjust the size as needed
    return (
      <div>
        <FontAwesomeIcon
          icon={faDownload}
          style={{marginRight: '10px', cursor: 'pointer'}}
          size={iconSize}
        />
        <FontAwesomeIcon
          icon={faDownload}
          style={{marginRight: '10px', cursor: 'pointer'}}
          size={iconSize}
        />
        <FontAwesomeIcon
          icon={faCloudArrowDown}
          style={{marginRight: '10px', cursor: 'pointer'}}
          size={iconSize}
        />
        <FontAwesomeIcon icon={faTrash} style={{cursor: 'pointer'}} size={iconSize} />
      </div>
    )
  }

  return (
    <>
      <PageTitle>Download History</PageTitle>
      <div style={gridContainerStyle}>
        {/* <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '-20px',
            border: '1px solid #ccc',
            width: '70%',
            borderBottom: 'none',
            marginTop: '2%',
          }}
        > */}
          {/* <div style={{display: 'flex', alignItems: 'center', marginLeft: '2%', paddingTop: '2%'}}> */}
            {/* <div style={{position: 'relative', width: '50%', marginLeft: '2%', marginTop: '2%'}}> */}
            <div
          style={{
            textAlign: 'left',
            marginBottom: '-20px',
            border: '1px solid #ccc',
            width: '80%',
            borderBottom: 'none',
            marginTop: '0%',
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
                  marginLeft: '-1px', // Adjust the position to eliminate the gap between input and button
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
              marginTop: '-4%',
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
                border: 'none', // Remove the border
                backgroundColor: 'transparent',
                marginLeft: '-20px',
                display: 'flex',
                alignItems: 'center',
                // Center the icon and text vertically
              }}
              onClick={resetGrid}
            >
              Reset &nbsp; <FontAwesomeIcon icon={faUndo} style={{marginRight: '3px'}} />
            </button>
          </span>
        </div>
            {/* </div> */}
          {/* </div> */}
        {/* </div> */}
        <GridComponent
          ref={gridInstance}
          dataSource={historydata}
          allowPaging={true}
          pageSettings={{pageSize: 4}}
          width='80%'
          style={gridStyle}
          allowSorting={true}
          allowFiltering={true}
        >
          <ColumnsDirective>
            <ColumnDirective field='S_No' headerText='S.No.' width='40' textAlign='Center' />
            <ColumnDirective field='Versions' headerText='Versions' width='100' />
            <ColumnDirective field='Modified_On' headerText='Modified On' width='80' />
            <ColumnDirective field='Modified_By' headerText='Modified By' width='80' />
            <ColumnDirective
              field='Actions'
              headerText='Actions'
              width='100'
              template={ActionsTemplate}
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Toolbar, Search]} />
        </GridComponent>
      </div>
    </>
  )
}

export default Downloadhistory
