import React, { FC, useState, useRef } from 'react';
import { useIntl } from 'react-intl';
import { PageTitle } from '../../../_metronic/layout/core';
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  Sort,
  Toolbar,
  Search,
  ToolbarItems,
  PageSettingsModel,
  SearchSettingsModel
} from '@syncfusion/ej2-react-grids';
import { data, reportingManagersList } from './data_emp';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faDownload, faCloudArrowDown, faMagnifyingGlass, faUndo } from '@fortawesome/free-solid-svg-icons';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
function DashboardPage() {
  const [searchText, setSearchText] = useState('');
  const gridInstance = useRef<GridComponent | null>(null);


  function CustomDropDownEditor(props: any) {
    return (
      <DropDownListComponent
        dataSource={reportingManagersList}
        value={props.value}
        change={(e:any) => {
          props.onChange(e.value);
        }}
      />
    );
  }
  
  


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
    fields: ['Employee_Name', 'Modified_By', 'Current_Role', 'Modified_On', 'Resume_Version'],
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
    marginTop: '10px',
  };
  const resetGrid = () => {
    setSearchText('');
    if (gridInstance.current) {
      gridInstance.current.search('');
      gridInstance.current.pageSettings.pageSize = 10;
      // You may also need to reset other grid settings as needed
    }
  };

  return (
    <>
      <div style={gridContainerStyle}>
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
                  marginLeft: '39%',
                  top: '50%',
                  cursor: 'pointer',
                }}
                onClick={handleClearSearch}
              >
                &#x2716;
              </div>
            )}
          </div>
          <span style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-2%', marginRight: '7%' }}>
            <DropDownButtonComponent > Filters</DropDownButtonComponent>

            <button
              style={{
                cursor: 'pointer',
                color: 'black',
                border: 'none', // Remove the border
                backgroundColor: 'transparent',
                marginLeft: '17px',
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
          dataSource={data}
          allowPaging={true}
          pageSettings={pageOptions}
          width="100%"
          style={gridStyle}
          allowSorting={true}
          
          searchSettings={searchSettings}

        >
          {/* Define your columns here */}
          <ColumnsDirective>
            <ColumnDirective field="S_No" headerText="S.No." width="55" textAlign="Center" allowSorting={true}/>
            <ColumnDirective type="checkbox" width="30" />
            <ColumnDirective field="Employee_Name" headerText="Employee Name" width="100" allowSorting={true} />
            <ColumnDirective field="Current_Role" headerText="Current Role" width="100" allowSorting={true} />
            
            <ColumnDirective field="Reporting_Manager" headerText="Reporting Manager" width="100" textAlign="Center" editType="dropdownedit" edit={{ params: { popupHeight: '200px' }, create: () => { return <CustomDropDownEditor />; } }} />
             <ColumnDirective field="Resume_Version" headerText="Resume Version" width="100" textAlign="Center" />
            <ColumnDirective field="Latest_Resume" headerText="Latest Resume" template={LatestResumeTemplate} width="90" />
            <ColumnDirective field="Projects" headerText="Projects" width="80" textAlign="Center" />
            <ColumnDirective field="Modified_On" headerText="Modified On" width="100" textAlign="Center" allowSorting={true} />
            <ColumnDirective field="Modified_By" headerText="Modified By" width="100"  allowSorting={true}/>
            <ColumnDirective field="Action" headerText="Action" template={actionTemplate} width="100" />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Toolbar, Search]} />
        </GridComponent>
      </div>
    </>
  );
}

const DashboardWrapper: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'EMPLOYEE' })}</PageTitle>
      <DashboardPage />
    </>
  );
}

export { DashboardWrapper };
