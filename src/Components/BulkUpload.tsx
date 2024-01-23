import React, {useState, useRef, useEffect} from 'react'
import {PageTitle} from '../_metronic/layout/core'
import axios from 'axios'
import {ColumnDirective, ColumnsDirective, Grid, GridComponent} from '@syncfusion/ej2-react-grids'
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
import {faMagnifyingGlass, faUndo, faCloudArrowUp} from '@fortawesome/free-solid-svg-icons'
import {DropDownButtonComponent} from '@syncfusion/ej2-react-splitbuttons'
import ProgressBar from 'react-bootstrap/ProgressBar'
import {Link} from 'react-router-dom'
import {useDropzone} from 'react-dropzone'
import Badge from 'react-bootstrap/Badge'
import {useDispatch} from 'react-redux'
import {downloadFile} from '../Store/App/Common/downloadTemplate'
// import {downloadFile} from '../Store/App/DownloadTemplate'

const Bulkupload = () => {
  const [searchText, setSearchText] = useState('')
  const gridInstance = useRef<GridComponent | null>(null)
  const [isFileUploaded, setIsFileUploaded] = useState(false)
  const [gridData, setGridData] = useState([])

  const {getRootProps, getInputProps, acceptedFiles} = useDropzone({
    accept: undefined, // Modify this to specify the accepted file types
    maxFiles: 5, // Specify the maximum number of files allowed
  })

  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({})

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      handleFileUpload()
    }
  }, [acceptedFiles])

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('http://localhost:8082/upload/EmployeeExcel', formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
          setUploadProgress((prevProgress) => ({
            ...prevProgress,
            [file.name]: progress,
          }))
        },
      })
      const dataWithSerialNumbers = addSerialNumbers(response.data)

      // Handle success, e.g., show a success message
      console.log(`File '${file.name}' uploaded successfully`, response.data)
      setIsFileUploaded(true)

      // Store the response data in the state variable
      setGridData(dataWithSerialNumbers)
      const status = response.data.status
      console.log(gridData)
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error(`Error uploading file '${file.name}': ${(error as Error).message}`)
    }
  }

  const addSerialNumbers = (data: any) => {
    // Add a new property called 'serialNumber' to each item in the data
    return data.map((item: any, index: any) => {
      return {...item, serialNumber: index + 1}
    })
  }

  const handleFileUpload = async () => {
    for (const file of acceptedFiles) {
      await uploadFile(file)
    }
  }

  const renderProgressBars = () => {
    return acceptedFiles.map((file) => (
      <div key={file.name} style={{marginTop: '5%'}}>
        <p>{file.name}</p>
        <ProgressBar
          now={uploadProgress[file.name] || 0}
          label={`${uploadProgress[file.name] || 0}%`}
          variant='success'
        />
      </div>
    ))
  }

  const handleClearSearch = () => {
    setSearchText('')
  }

  const pageOptions: PageSettingsModel = {
    pageSize: 10,
    pageSizes: true,
  }

  const searchSettings: SearchSettingsModel = {
    fields: ['S_No', 'Employee_Name', 'Employee_ID', 'Current_Role'],
  }

  const handleSearch = () => {
    if (gridInstance.current) {
      gridInstance.current.search(searchText)
    }
  }

  const gridContainerStyle: React.CSSProperties = {
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
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
      gridInstance.current.pageSettings.pageSize = 8
      gridInstance.current.clearSorting()
    }
  }
  const statusTemplate = ({status}: {status: boolean}) => {
    if (status === false) {
      return <Badge bg='success'>Success</Badge>
    } else {
      return <Badge bg='danger'>Failed</Badge>
    }
  }
  const dispatch = useDispatch()
  const handleDownload = async () => {
    try {
      dispatch(downloadFile())
    } catch {
      console.error('Error downloading file:')
    }
  }
  return (
    <>
      <div style={gridContainerStyle}>
        <PageTitle>Bulk Upload | Employee</PageTitle>

        <div style={{display: 'flex', alignItems: 'flex-start'}}>
          <div
            className=''
            style={{
              border: '1px dashed black',
              width: '50%',
              height: '300px',
              position: 'relative',
            }}
          >
            <div
              {...getRootProps({className: 'dropzone'})}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <FontAwesomeIcon
                icon={faCloudArrowUp}
                style={{fontSize: '36px', marginBottom: '10px'}}
              />
              <p>Browse file to Upload</p>
            </div>
            <aside>{renderProgressBars()}</aside>
          </div>
          <button
            style={{
              cursor: 'pointer',
              color: 'black',
              border: '1px solid black',
              marginLeft: '30%', // Use a percentage or em/rem unit for responsiveness
              backgroundColor: 'white',
              borderRadius: '5px', // Use a reasonable value for borderRadius

              // Add padding to improve the button's appearance and make it more clickable
              padding: '10px 15px',
            }}
            onClick={handleDownload}
          >
            Download Template &nbsp;
          </button>
        </div>

        {isFileUploaded && (
          <>
            <div
              style={{
                textAlign: 'left',
                marginBottom: '-20px',
                border: '1px solid #ccc',
                width: '100%',
                borderBottom: 'none',
                marginTop: '10%',
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
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{padding: '10px', color: '#aaa'}}
                  />
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
                  marginTop: '-2%',
                  marginRight: '1%',
                }}
              >
                {/* <DropDownButtonComponent style={{border: 'none', width: '9%'}}>
                  {' '}
                  Filters{' '}
                </DropDownButtonComponent> */}
                <button
                  style={{
                    cursor: 'pointer',
                    color: 'black',
                    border: 'none',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onClick={resetGrid}
                >
                  Reset &nbsp; <FontAwesomeIcon icon={faUndo} style={{marginRight: '3px'}} />
                </button>
              </span>
            </div>

            <GridComponent
              ref={gridInstance}
              dataSource={gridData}
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
                  field='fullName'
                  textAlign='Left'
                  headerText='Employee Name'
                  width='70'
                  allowSorting={true}
                />
                <ColumnDirective
                  field='employee_id'
                  textAlign='Left'
                  headerText=' Employee ID'
                  width='50'
                  allowSorting={true}
                />
                <ColumnDirective
                  field='currentRole'
                  headerText='Current Role'
                  width='40'
                  textAlign='Left'
                />
                <ColumnDirective
                  field='status'
                  headerText='Status'
                  width='50'
                  textAlign='Center'
                  template={statusTemplate}
                />
                <ColumnDirective
                  field='remark'
                  allowSorting={false}
                  textAlign='Left'
                  headerText='Remarks'
                  width='100'
                />
              </ColumnsDirective>
              <Inject services={[Page, Sort, Toolbar, Search]} />
            </GridComponent>
          </>
        )}

        <div className='d-flex justify-content-center'>
          <Link
            to='/dashboard'
            style={{
              cursor: 'pointer',
              color: 'black',
              border: '1px solid black',
              borderRadius: '2px',
              marginRight: '13%',
              marginTop: '7%',
              width: '143px',
              height: '42px',
              padding: ' 1%',
              paddingLeft: '53px',
              paddingTop: '12px',
            }}
          >
            Back{' '}
          </Link>
        </div>
      </div>
    </>
  )
}

export default Bulkupload
