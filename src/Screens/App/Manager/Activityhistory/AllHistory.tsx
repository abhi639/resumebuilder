import React, {useState, useRef, useEffect} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {ColumnDirective, ColumnsDirective, GridComponent} from '@syncfusion/ej2-react-grids'
// import { historydata } from './historydata';
import {
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
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import {UserModel} from '../../../../app/modules/auth/models/UserModel'

interface ActivityData {
  activity_id: number
  activity_type: string
  activity_on: string
  activity_by: string
  description: string
  new_data: string
  old_data: string
}

const Allhistory = () => {
  const [searchText, setSearchText] = useState('')
  const gridInstance = useRef<GridComponent | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState<ActivityData[]>([])

  const [newChangesData, setNewChangesData] = useState<string>('')
  const [previousChangesData, setPreviousChangesData] = useState<string>('')
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const userId = user?.user_id
  useEffect(() => {
    // Only fetch data if user is defined
    if (user) {
      const apiUrl = `http://localhost:8082/api/activity/byUser/${userId}`
      axios
        .get(apiUrl)
        .then((response) => {
          const formattedData = response.data.map((item: ActivityData) => ({
            ...item,
            activity_on: new Date(item.activity_on).toLocaleString(),
            newChanges: item.new_data,
            previousChanges: item.old_data,
          }))
          const dataWithSerialNumbers = addSerialNumbers(response.data)
          setData(dataWithSerialNumbers)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }
  }, [userId])
  console.log(data)

  const addSerialNumbers = (data: any) => {
    // Add a new property called 'serialNumber' to each item in the data
    return data.map((item: any, index: any) => {
      return {...item, serialNumber: index + 1}
    })
  }

  const ChangesTemplate = (props: any) => {
    return (
      <div>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => {
            // // Get the "New Changes" and "Previous Changes" data from the current row
            const newChanges = props.newChanges
            const previousChanges = props.previousChanges

            // console.log(newChanges,previousChanges)

            // // Set the data in state variables and show the modal
            setNewChangesData(newChanges)
            setPreviousChangesData(previousChanges)
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

  const handleClearSearch = () => {
    setSearchText('')
  }

  const pageOptions: PageSettingsModel = {
    pageSize: 10,
    pageSizes: true,
  }

  const searchSettings: SearchSettingsModel = {
    fields: ['activity_id', 'activity_type', 'activity_on', 'activity_by', 'description'],
  }

  const handleSearch = () => {
    if (gridInstance.current) {
      gridInstance.current.search(searchText)
    }
  }

  const gridContainerStyle: React.CSSProperties = {
    // boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '5px',
  }

  const gridStyle: React.CSSProperties = {
    marginTop: '20px',
  }
  const resetGrid = () => {
    setSearchText('')
    if (gridInstance.current) {
      gridInstance.current.search('')
      gridInstance.current.pageSettings.pageSize = 4
      gridInstance.current.clearSorting()
      // You may also need to reset other grid settings as needed
    }
  }

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size='xl'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header>
          <Modal.Title id='contained-modal-title-vcenter'>View Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col'>
              <Card bg='light' text='dark' style={{width: '100%'}} className='mb-2'>
                <Card.Title>Previous changes</Card.Title>
                <Card.Body style={{height: '150px', overflowY: 'auto', border: '1px solid #ccc'}}>
                  <Card.Text>{previousChangesData}</Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className='col'>
              <Card bg='light' text='dark' style={{width: '100%'}} className='mb-2'>
                <Card.Title>New changes</Card.Title>
                <Card.Body style={{height: '150px', overflowY: 'auto', border: '1px solid #ccc'}}>
                  <Card.Text>{newChangesData}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant='dark' onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <PageTitle>Activity History</PageTitle>
      <div style={gridContainerStyle}>
        <div
          style={{
            textAlign: 'left',
            marginBottom: '-20px',
            border: '1px solid #ccc',
            width: '100%',
            borderBottom: 'none',
            marginTop: '2%',
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
        {data.length > 0 && (
          <GridComponent
            ref={gridInstance}
            // dataSource={historydata}
            dataSource={data}
            allowPaging={true}
            pageSettings={pageOptions}
            width='100%'
            style={gridStyle}
            allowSorting={true}
            searchSettings={searchSettings}
          >
            <ColumnsDirective>
              <ColumnDirective
                field='serialNumber'
                headerText='S.No.'
                width='40'
                textAlign='Center'
                allowSorting={true}
              />
              <ColumnDirective
                field='activity_type'
                textAlign='Left'
                headerText='Activity'
                width='50'
                allowSorting={true}
              />
              <ColumnDirective
                field='activity_on'
                textAlign='Left'
                headerText='Activity On'
                width='80'
                allowSorting={true}
              />
              <ColumnDirective
                field='activity_by'
                headerText='Activity By'
                width='80'
                textAlign='Left'
              />
              <ColumnDirective
                field='description'
                headerText='Description'
                allowSorting={false}
                width='100'
                textAlign='Left'
              />
              <ColumnDirective
                field='Changes'
                textAlign='Center'
                headerText='Changes'
                allowSorting={false}
                template={ChangesTemplate}
                width='50'
              />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Toolbar, Search]} />
          </GridComponent>
        )}
      </div>
    </>
  )
}
export default Allhistory
