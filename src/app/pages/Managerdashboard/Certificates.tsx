import { faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Certificates = (props: any) => {
  const [certificate_name, setCertificateName] = useState('')
  const [link, setLink] = useState('');
  const [Date, setDate] = useState('')

  const [updated_certificate_name, setUpdatedCertificateName] = useState('')
  const [updatedlink, setUpdatedLink] = useState('');
  const [UpdatedDate, setUpdatedDate] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [dataSaved, setDataSaved] = useState(false);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [expandedcertificates, setExpandedCertificates] = useState(Array(certificates.length).fill(false));
 
  const { user_id } = props;

  const handleSave = () => {
    // Perform save operation here
    const data = {
      certificate_name: certificate_name,
      certificate_url: link,
      certificate_date: Date,

    }
    // Implement your save logic using 'data'
    console.log('Data to be saved:', data)

    const backendApiUrl = 'http://localhost:8082/api/certifications/add';

    axios.post(backendApiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      console.log('Data successfully sent to the backend.');
      setCertificateName('')
      setLink('')
      setDate('')
      setDataSaved(!dataSaved);
      setShowForm(false);
    })
      .catch(error => {
        console.error('An error occurred:', error);
      });

  }

  const [selectedOptions, setSelectedOptions] = useState<string[]>(Array(certificates.length).fill('Showduration'));

    // Function to handle the change in the select dropdown for a specific experience
    const handleSelectChangeForCertificates = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = event.target.value;
        setSelectedOptions(newSelectedOptions);
    };


  useEffect(() => {
    // Make a GET request to fetch experiences by user_id
    const backendApiUrl = `http://localhost:8082/api/certifications/list/${user_id}`;
    axios
      .get(backendApiUrl)
      .then((response) => {

        setCertificates(response.data as any[]);
        console.log(certificates)
      })
      .catch((error) => {
        console.error('Error fetching experiences:', error);
      });
  }, [user_id, dataSaved]);





  const handleCertificateClick = (CertificateId: number, index: number) => {
    // Toggle the expanded state of the selected experience
    const newExpandedExperiences = [...expandedcertificates];
    newExpandedExperiences[index] = !newExpandedExperiences[index];
    setExpandedCertificates(newExpandedExperiences);

    // Make an API request to fetch the details of the selected professional experience
    const backendApiUrl = `http://localhost:8082/api/certifications/getById/${CertificateId}`;
    axios
      .get(backendApiUrl)
      .then((response) => {
        console.log('certifications Details:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching professional experience details:', error);
      });
  };

  const handleUpdate = (CertificateId: number, index: number) => {

    const updatedData = {
      certificate_name: updated_certificate_name,
      certificate_url: updatedlink,
      certificate_date: UpdatedDate,
    };



    const backendApiUrl = `http://localhost:8082/api/certifications/update/${CertificateId}`;

    axios.put(backendApiUrl, updatedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('Experience updated successfully:', response.data);


        // Update the state with the updated experiences array

        setExpandedCertificates((prevExpandedExperiences) => {
          const updatedExpandedExperiences = [...prevExpandedExperiences];
          updatedExpandedExperiences[index] = false;
          return updatedExpandedExperiences;
        });
        setDataSaved(!dataSaved);

      })
      .catch(error => {
        console.error('An error occurred while updating the experience:', error);
      });
  };
  const handleDelete = (CertificateId: number, index: number) => {
    const backendApiUrl = `http://localhost:8082/api/certifications/delete/${CertificateId}`;

    axios.delete(backendApiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('Experience deleted successfully:', response.data);

        // Remove the deleted experience from your state
        const updatedExperiences = [...certificates];
        updatedExperiences.splice(index, 1);

        // Update the state with the updated experiences array
        setCertificates(updatedExperiences);

        // Reset the expanded state to collapse the experience
        setExpandedCertificates((prevExpandedExperiences) => {
          const updatedExpandedExperiences = [...prevExpandedExperiences];
          updatedExpandedExperiences[index] = false;
          return updatedExpandedExperiences;
        });
        setDataSaved(!dataSaved);
      })
      .catch(error => {
        console.error('An error occurred while deleting the experience:', error);
      });
  };

  return (

    <>

      {certificates.map((certificate, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'column', // Display the experience and additional information in a column
            border: '1px solid #D3D3D3',
            padding: '10px',
            marginTop: '30px',
          }}
        >
          {/* Display experience details here */}
          {expandedcertificates[index] ? null : (
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '17px' }}>
                <b>{certificate.certificate_name}</b>
              </p>
              <p style={{ fontSize: '17px' }}>
                {selectedOptions[index] === 'Showduration'
                  ? `${certificate.certificate_date.split('-')[0]}`
                  : selectedOptions[index] === 'Showdates'
                    ? `${certificate.certificate_date}`
                    : ''}

              </p>
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '50%',
                marginLeft: '50%',
                marginTop: '-10% '
              }}>
                <div style={{ marginBottom: '5px' }}>
                  <input type="checkbox" name="" id="" />
                </div>
                <div>
                  <select value={selectedOptions}  onChange={(event) => handleSelectChangeForCertificates(event, index)}>
                    <option value="Showduration">Show Duration</option>
                    <option value="Showdates">Show Dates</option>
                    {/* <option value="Shownothing">Show Nothing</option> */}
                  </select>
                </div>
              </div>
              <FontAwesomeIcon
                style={{ marginLeft: "50%" }}
                icon={faAngleDown}
                onClick={() => {
                  // Set the state variables to the values of the selected experience
                  setUpdatedCertificateName(certificate.certificate_name);
                  setUpdatedLink(certificate.certificate_url);
                  setUpdatedDate(certificate.certificate_date);


                  handleCertificateClick(certificate.certification_id, index);
                }}
              />
            </div>




          )}
          {expandedcertificates[index] && (
            // Display additional information below the experience when it is expanded
            <div>
              {/* Add additional information here */}

              <div
                style={{
                  border: '1px solid #D3D3D3',
                  padding: '20px',
                  borderRadius: '-1px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <div style={{ width: '48%' }}>
                    <label style={{ fontWeight: 'bold' }}>Certificate Name</label>
                    <input
                      type='text'
                      style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                      value={updated_certificate_name}
                      onChange={(e) => setUpdatedCertificateName(e.target.value)}

                    />
                  </div>
                  <div style={{ width: '48%' }}>
                    <label style={{ fontWeight: 'bold' }}> Date</label>
                    <input
                      type='date'
                      style={{ width: '100%', padding: '10px' }}
                      value={UpdatedDate}
                      onChange={(e) => setUpdatedDate(e.target.value)}

                    />
                  </div>

                </div>
                <div style={{ width: '100%' }}>
                  <label style={{ fontWeight: 'bold' }}>Certificate Link <span style={{ color: "#ccc", marginLeft: "6px" }}>  optional</span></label>
                  <input
                    type='text'
                    style={{ width: '58%', padding: '10px', marginBottom: '10px', marginLeft: '12px' }}
                    value={updatedlink}
                    onChange={(e) => setUpdatedLink(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', marginTop: '20px', marginLeft: '75%' }}>
                  <button
                    onClick={() => {
                      handleUpdate(certificate.certification_id, index);
                    }}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: 'black',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      marginRight: '10px',
                    }}
                  >
                    update
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(certificate.certification_id, index);
                    }}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: 'black',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

            </div>
          )}

        </div >
      ))}












      <div style={{ marginTop: '5%' }}>
        {showForm ? (
          <div
            style={{
              border: '1px solid #D3D3D3',
              padding: '20px',
              borderRadius: '-1px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}
            >
              <div style={{ width: '48%' }}>
                <label style={{ fontWeight: 'bold' }}>Certificate Name</label>
                <input
                  type='text'
                  style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                  value={certificate_name}
                  onChange={(e) => setCertificateName(e.target.value)}

                />
              </div>
              <div style={{ width: '48%' }}>
                <label style={{ fontWeight: 'bold' }}> Date</label>
                <input
                  type='date'
                  style={{ width: '100%', padding: '10px' }}
                  value={Date}
                  onChange={(e) => setDate(e.target.value)}

                />
              </div>

            </div>
            <div style={{ width: '100%' }}>
              <label style={{ fontWeight: 'bold' }}>Certificate Link <span style={{ color: "#ccc", marginLeft: "6px" }}>  optional</span></label>
              <input
                type='text'
                style={{ width: '61%', padding: '10px', marginBottom: '10px', marginLeft: '12px' }}
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <button
              onClick={handleSave}
              style={{
                padding: '10px 20px',
                backgroundColor: 'black',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                marginTop: '20px',
                marginLeft: '86%',
              }}
            >
              Save
            </button>
          </div>
        ) : null}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '1rem',
            alignItems: 'center',
            marginRight: '79%',
            whiteSpace: 'nowrap', // Prevent the text from breaking into multiple lines
          }}
        >
          <FontAwesomeIcon icon={faPlus} style={{ color: '#000', marginRight: '0.5rem' }} />
          <span
            style={{
              textDecoration: 'none',
              color: '#000',
              cursor: 'pointer',
              marginRight: '-57%',
            }}
            onClick={() => setShowForm(true)} // Toggle the showForm state to display the form
          >
            Add More Certificates
          </span>
        </div>
      </div>
    </>
  )
}

export default Certificates
