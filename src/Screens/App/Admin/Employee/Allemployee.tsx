import React, { FC, useState, useRef, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { PageTitle } from '../../../../_metronic/layout/core';
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
  SearchSettingsModel
} from '@syncfusion/ej2-react-grids';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faDownload, faCloudArrowDown, faMagnifyingGlass, faUndo } from '@fortawesome/free-solid-svg-icons';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
// import './Dashboardcss.css'
interface Employee {
  // Your employee properties here
  modified_on: string; // Assuming modified_on is a string

    user_id: number;

  
}


function Allemployee() {
  const [searchText, setSearchText] = useState('');
  const gridInstance = useRef<GridComponent | null>(null);
  const history = useHistory()
  const [employeeData, setEmployeeData] = useState([]);
  const dropdownData = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' },
];


const fetchEmployeeData = async () => {
  try {
    const response = await Axios.get('http://localhost:8082/list');
    const formattedData = response.data.map((item: Employee) => ({
      ...item,
      modified_on: new Date(item.modified_on).toLocaleString()
    }));
    setEmployeeData(formattedData);
    console.log(formattedData); // Log the formatted data
  } catch (error) {
    console.error('Error fetching employee data:', error);
  }
};



useEffect(() => {
  fetchEmployeeData();
}, []);

  const actionTemplate = (props: any) => (
    <div>
      <FontAwesomeIcon icon={faEye} title="View" /> &nbsp;
      <FontAwesomeIcon icon={faEdit} title="Edit" /> &nbsp;
      <FontAwesomeIcon icon={faTrash} title="Delete" /> &nbsp;
    </div>
  );


  const downloadDoc = () => {
    const imageUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAKlBMVEX09PTMzMz39/fe3t7JycnPz8/j4+PT09Ps7OzX19fx8fHa2trp6enm5uYqz2W0AAABhElEQVR4nO3Y646CMBBAYVoKvSDv/7pbCgq4KCVZZ8zmfP7xlnAcQkGaBgAAAAAAAAAAAACA/8ZeINXU+65a7EWSbHTmAhcFhmX73OSq5e+OAlXRGN9X64yJn29qvDFt9W+3rUxU/OooG24hneRJRyU/HVz9+yrhqGDKyuDe70rhqGFZrVz4oqjHCjrsR/X0SjQqPKL2K7a9mbB5QzYqHUflJtdtDknh3efv57Zx11Ra11kJR43zqJzfNc3vdUkpyo7ltOzT+skyp+2spBdPG/qh3e+79XrlPivtc99mTuuslKM2cyrmY1A36mlO96VeJcq284L+PKcyq6ATZVvnYnM0pzKrpBGVm/KmB3s0J62o0jRVHc5JJ2ppek0h6rRJIcr2J0kKUedzUohKFf/dxaMCUUT9cVQTKmhfurwgFTXfCpofZbvLM7t/sTyEooZ8pdRW6379hf6Ecul06fbi7eNNuWpwF+7EOicwqMkYfbUoMafiG2/uAwAAAAAAAAAAAAAg5gdNPhIZchhiJQAAAABJRU5ErkJggg==';

    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a Blob URL for the image
        const blobUrl = window.URL.createObjectURL(blob);

        // Create a hidden anchor element for downloading
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = 'quadwave-logo.png';

        // Trigger a click event on the anchor element to initiate the download
        anchor.click();

        // Revoke the Blob URL to release memory
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        console.error('Error downloading image:', error);
      });
  };


  const downloadPdf = () => {
    const imageUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAKlBMVEX09PTMzMz39/fe3t7JycnPz8/j4+PT09Ps7OzX19fx8fHa2trp6enm5uYqz2W0AAABhElEQVR4nO3Y646CMBBAYVoKvSDv/7pbCgq4KCVZZ8zmfP7xlnAcQkGaBgAAAAAAAAAAAACA/8ZeINXU+65a7EWSbHTmAhcFhmX73OSq5e+OAlXRGN9X64yJn29qvDFt9W+3rUxU/OooG24hneRJRyU/HVz9+yrhqGDKyuDe70rhqGFZrVz4oqjHCjrsR/X0SjQqPKL2K7a9mbB5QzYqHUflJtdtDknh3efv57Zx11Ra11kJR43zqJzfNc3vdUkpyo7ltOzT+skyp+2spBdPG/qh3e+79XrlPivtc99mTuuslKM2cyrmY1A36mlO96VeJcq284L+PKcyq6ATZVvnYnM0pzKrpBGVm/KmB3s0J62o0jRVHc5JJ2ppek0h6rRJIcr2J0kKUedzUohKFf/dxaMCUUT9cVQTKmhfurwgFTXfCpofZbvLM7t/sTyEooZ8pdRW6379hf6Ecul06fbi7eNNuWpwF+7EOicwqMkYfbUoMafiG2/uAwAAAAAAAAAAAAAg5gdNPhIZchhiJQAAAABJRU5ErkJggg==';
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a Blob URL for the image
        const blobUrl = window.URL.createObjectURL(blob);

        // Create a hidden anchor element for downloading
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = 'quadwave-logo-new.png';

        // Trigger a click event on the anchor element to initiate the download
        anchor.click();

        // Revoke the Blob URL to release memory
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        console.error('Error downloading image:', error);
      });
  };


  const LatestResumeTemplate = (props: any) => (
    <div>
      <FontAwesomeIcon
        icon={faDownload}
        title="downloadDoc"
        onClick={downloadDoc} // Add this onClick handler
        style={{ cursor: 'pointer' }}
      /> &nbsp;&nbsp;
      <FontAwesomeIcon
        icon={faDownload}
        title="downloadPdf"
        onClick={downloadPdf} // Add this onClick handler
        style={{ cursor: 'pointer' }} /> &nbsp;&nbsp;
      <FontAwesomeIcon icon={faCloudArrowDown} /> &nbsp;&nbsp;
    </div>
  );



  const handleClearSearch = () => {
    
    setSearchText('');
  };


  const pageOptions: PageSettingsModel = {
    pageSize: 10, pageSizes: true
  };

  const searchSettings: SearchSettingsModel = {
    fields: ['full_name', 'modified_by', 'current_role', 'modified_on', 'Resume_Version'],
  };

  
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
  };

  const gridStyle: React.CSSProperties = {
    marginTop: '-10px',
  };
  const resetGrid = () => {
    setSearchText('');
    if (gridInstance.current) {
      gridInstance.current.search('');
      gridInstance.current.pageSettings.pageSize = 10;
      gridInstance.current.clearSorting();
      // You may also need to reset other grid settings as needed
    }
  };

 

  // const handleRowSelected = (args: any) => {
  //   if (gridInstance.current) {
  //     const selectedRecord = gridInstance.current.getSelectedRecords()[0] as Employee;
  //     if (selectedRecord) {
  //       const userId = selectedRecord.user_id;
  //       history.push(`/editemp/${userId}`);
  //     }
  //   }
  // };
  const EmployeeNameTemplate = (props: {
    user_id: any
    full_name:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined
  }) => (
    <div>
      <Link to={`/editemp/${props.user_id}`}>{props.full_name}</Link>
    </div>
  )
  


  return (
    <>
      <div style={gridContainerStyle}>
        <PageTitle>Employee</PageTitle>
        <div style={{ textAlign: 'left', marginBottom: '10px' ,border: '1px solid #ccc', width: '100%', borderBottom: 'none' , }}>
          <div style={{ position: 'relative', width: '50%',marginTop:'1%' ,marginLeft:'2%'}}>

            <div style={{ display: 'flex', alignItems: 'center', maxWidth: '400px', border: '1px solid #ccc', borderRadius: '5px' }}>
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{ padding: '10px', color: '#aaa' }} />
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ padding: '10px', width: '100%', border: 'none', outline: 'none' }}
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
                  marginLeft: '53%',
                  top: '50%',
                  cursor: 'pointer',
                }}
                onClick={handleClearSearch}
              >
                &#x2716;
              </div>
            )}
          </div>
          <span style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-3%', marginRight: '7%' }}>
            {/* <DropDownButtonComponent style={{border:'none',width:'10%'}}> Filters</DropDownButtonComponent> */}

            <button
              style={{
                cursor: 'pointer',
                color: 'black',
                border: 'none', // Remove the border
                backgroundColor: 'transparent',
                marginLeft: '-20px',
                display: 'flex',
                alignItems: 'center', // Center the icon and text vertically
              }}
              onClick={resetGrid}
            >
              Reset &nbsp; <FontAwesomeIcon icon={faUndo} style={{ marginRight: '3px' }} />
            </button>


          </span>
        </div>
        <GridComponent
          ref={gridInstance}
          dataSource={employeeData}
          allowPaging={true}
          pageSettings={pageOptions}
          width='100%'
          style={gridStyle}
          allowSorting={true}
          searchSettings={searchSettings}
          // rowSelected={handleRowSelected}
        >
         
          <ColumnsDirective>
            <ColumnDirective
              field='user_id'
              headerText='S.No.'
              width='5%'
              textAlign='Center'
              allowSorting={true}
              customAttributes={{class: 'custom-action'}}
            />
            <ColumnDirective
              type='checkbox'
              width='3%'
              customAttributes={{class: 'custom-action'}}
            />
            <ColumnDirective
              field='full_name'
              headerText='Employee Name'
              width='12%'
              allowSorting={true}
              template={EmployeeNameTemplate}
              customAttributes={{class: 'custom-action'}}
            />
            <ColumnDirective
              field='current_role'
              headerText='Current Role'
              width='8%'
              allowSorting={true}
              clipMode='EllipsisWithTooltip'
              customAttributes={{class: 'custom-action'}}
            />

            {/* <ColumnDirective
              field='Resume_Version'
              headerText='Resume Version'
              allowSorting={false}
              width='10%'
              textAlign='Center'
              customAttributes={{class: 'custom-action'}}
            />
            <ColumnDirective
              field='Latest_Resume'
              headerText='Latest Resume'
              allowSorting={false}
              template={LatestResumeTemplate}
              width='10%'
              customAttributes={{class: 'custom-action'}}
              
            /> 
            <ColumnDirective
              field='Projects'
              headerText='Projects'
              allowSorting={false}
              width='7%'
              textAlign='Center'
              customAttributes={{class: 'custom-action'}}
            />*/}
            <ColumnDirective
              field='modified_on'
              headerText='Modified On'
              width='10%'
              customAttributes={{class: 'custom-action'}}
              textAlign='Center'
              allowSorting={true}
            />
            <ColumnDirective
              field='modified_by'
              headerText='Modified By'
              width='10%'
              customAttributes={{class: 'custom-action'}}
              textAlign='Center'
              allowSorting={true}
            />
            <ColumnDirective
              field='Action'
              headerText='Action'
              allowSorting={false}
              textAlign='Center'
              template={actionTemplate}
              customAttributes={{class: 'custom-action'}}
              width='7%'
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Toolbar, Search]} />
        </GridComponent>
      </div>
    </>
  );
}




export default Allemployee;
