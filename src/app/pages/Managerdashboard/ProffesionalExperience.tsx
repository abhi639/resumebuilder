import { faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect, useState } from 'react'


interface ProfessionalExperience {
    job_title: string;
    organization_name: string;
    location: string;
    start_date: string;
    end_date: string;
    current: boolean;
}

const ProffesionalExperience = (props: any) => {
    const [jobTitle, setJobTitle] = useState('');
    const [organization, setOrganization] = useState('')
    const [location, setLocation] = useState('')
    const [start_date, setStartDate] = useState('')
    const [end_date, setEndDate] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [current, setCurrent] = useState(false);


    const [updatedjobTitle, setUpdatedJobTitle] = useState('');
    const [updatedorganization, setUpdatedOrganization] = useState('')
    const [updatedlocation, setUpdatedLocation] = useState('')
    const [updated_start_date, setUpdatedStartDate] = useState('')
    const [updated_end_date, setUpdatedEndDate] = useState('')
    const [updatedcurrent, setUpdatedCurrent] = useState(false);

    const [dataSaved, setDataSaved] = useState(false);
    const [experiences, setExperiences] = useState<any[]>([]);

    const [expandedExperiences, setExpandedExperiences] = useState(Array(experiences.length).fill(false));
    const { user_id } = props;

    const handleSave = () => {
        // Perform save operation here
        const data = {
            job_title: jobTitle,
            organization_name: organization,
            location: location,
            start_date: start_date,
            end_date: end_date,
            current,
        }
        // Implement your save logic using 'data'
        console.log('Data to be saved:', data)
        const backendApiUrl = 'http://localhost:8082/api/professionalexperience/add';

        axios.post(backendApiUrl, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            console.log('Data successfully sent to the backend.');
            setJobTitle('');
            setOrganization('');
            setLocation('');
            setStartDate('');
            setEndDate('');
            setCurrent(false);
            setShowForm(false);
            setDataSaved(!dataSaved);
        })
            .catch(error => {
                console.error('An error occurred:', error);
            });
    }




    // Fetch professional experiences when the component mounts
    useEffect(() => {
        // Make a GET request to fetch experiences by user_id
        const backendApiUrl = `http://localhost:8082/api/professionalexperience/list/${user_id}`;
        axios
            .get(backendApiUrl)
            .then((response) => {

                setExperiences(response.data as any[]);
                console.log(experiences)
            })
            .catch((error) => {
                console.error('Error fetching experiences:', error);
            });
    }, [user_id, dataSaved]);

    // Add a state variable to track the selected option
    const [selectedOptions, setSelectedOptions] = useState<string[]>(Array(experiences.length).fill('Showduration'));

    // Function to handle the change in the select dropdown for a specific experience
    const handleSelectChangeForExperience = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = event.target.value;
        setSelectedOptions(newSelectedOptions);
    };

    const handleExperienceClick = (experienceId: number, index: number) => {
        // Toggle the expanded state of the selected experience
        const newExpandedExperiences = [...expandedExperiences];
        newExpandedExperiences[index] = !newExpandedExperiences[index];
        setExpandedExperiences(newExpandedExperiences);

        // Make an API request to fetch the details of the selected professional experience
        const backendApiUrl = `http://localhost:8082/api/professionalexperience/${experienceId}`;
        axios
            .get(backendApiUrl)
            .then((response) => {
                console.log('Professional Experience Details:', response.data);
            })
            .catch((error) => {
                console.error('Error fetching professional experience details:', error);
            });
    };




    const handleUpdate = (experienceId: number, index: number) => {

        const updatedData = {
            job_title: updatedjobTitle,
            organization_name: updatedorganization,
            location: updatedlocation,
            start_date: updated_start_date,
            end_date: updated_end_date,
            current: updatedcurrent,
        };



        const backendApiUrl = `http://localhost:8082/api/professionalexperience/update/${experienceId}`;

        axios.put(backendApiUrl, updatedData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log('Experience updated successfully:', response.data);


                // Update the state with the updated experiences array

                setExpandedExperiences((prevExpandedExperiences) => {
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


    const handleDelete = (experienceId: number, index: number) => {
        const backendApiUrl = `http://localhost:8082/api/professionalexperience/delete/${experienceId}`;

        axios.delete(backendApiUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log('Experience deleted successfully:', response.data);

                // Remove the deleted experience from your state
                const updatedExperiences = [...experiences];
                updatedExperiences.splice(index, 1);

                // Update the state with the updated experiences array
                setExperiences(updatedExperiences);

                // Reset the expanded state to collapse the experience
                setExpandedExperiences((prevExpandedExperiences) => {
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

    const calculateDuration = (startDate: string, endDate: string | null): string => {
        const start = new Date(startDate);
      
        let end: Date;
      
        if (endDate === null) {
          end = new Date(); // Set end date to today if it's null
        } else {
          end = new Date(endDate);
        }
      
        const diffInMilliseconds = Math.abs(end.getTime() - start.getTime());
        const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
      
        const years = Math.floor(days / 365);
        const months = Math.floor((days % 365) / 30);
      
        if (years > 0) {
          if (months > 0) {
            return `${years} ${years === 1 ? 'year' : 'years'} ${months} ${
              months === 1 ? 'month' : 'months'
            }`;
          } else {
            return `${years} ${years === 1 ? 'year' : 'years'}`;
          }
        } else {
          if (months > 0) {
            return `${months} ${months === 1 ? 'month' : 'months'}`;
          } else {
            return '1 month'; // If the start and end dates are the same month
          }
        }
      };
      




    return (

        <>
            {experiences.map((experience, index) => (
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
                    {expandedExperiences[index] ? null : (
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '17px' }}>
                                <b>{experience.job_title}</b>, {experience.organization_name}
                            </p>
                            <p style={{ fontSize: '17px' }}>
                                {selectedOptions[index] === 'Showduration'
                                    ? calculateDuration(experience.start_date, experience.end_date)
                                    : selectedOptions[index] === 'Showdates'
                                        ? `${experience.start_date} - ${experience?.end_date || 'Current'}`
                                        : ''}
                                | {experience.location}
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
                                    <select value={selectedOptions[index]} onChange={(event) => handleSelectChangeForExperience(event, index)}>
                                        <option value="Showduration">Show Duration</option>
                                        <option value="Showdates">Show Dates</option>
                                        <option value="Shownothing">Show Nothing</option>
                                    </select>
                                </div>
                            </div>
                            <FontAwesomeIcon
                                style={{ marginLeft: "50%" }}
                                icon={faAngleDown}
                                onClick={() => {
                                    // Set the state variables to the values of the selected experience
                                    setUpdatedJobTitle(experience.job_title);
                                    setUpdatedOrganization(experience.organization_name);
                                    setUpdatedLocation(experience.location);
                                    setUpdatedStartDate(experience.start_date);
                                    setUpdatedEndDate(experience.end_date);
                                    setUpdatedCurrent(experience.current);

                                    handleExperienceClick(experience.professional_experience_id, index);
                                }}
                            />
                        </div>




                    )}
                    {expandedExperiences[index] && (
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

                                <div style={{ width: '100%' }}>
                                    <label style={{ fontWeight: 'bold' }}>Job Title</label>
                                    <input
                                        type='text'
                                        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                                        value={updatedjobTitle}
                                        onChange={(e) => setUpdatedJobTitle(e.target.value)}
                                    />
                                </div>
                                <div
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '20px',
                                    }}
                                >





                                    <div style={{ width: '48%' }}>
                                        <label style={{ fontWeight: 'bold' }}>Organization Name</label>
                                        <input
                                            type='text'
                                            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                                            value={updatedorganization}
                                            onChange={(e) => setUpdatedOrganization(e.target.value)}

                                        />
                                    </div>
                                    <div style={{ width: '48%' }}>
                                        <label style={{ fontWeight: 'bold' }}>Location</label>
                                        <input
                                            type='text'
                                            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                                            value={updatedlocation}
                                            onChange={(e) => setUpdatedLocation(e.target.value)}

                                        />
                                    </div>
                                </div>
                                <div
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <div style={{ width: '48%' }}>
                                        <label style={{ fontWeight: 'bold' }}>Start Date</label>
                                        <input
                                            type='date'
                                            style={{ width: '100%', padding: '10px' }}
                                            value={updated_start_date}
                                            onChange={(e) => setUpdatedStartDate(e.target.value)}

                                        />
                                    </div>
                                    <div style={{ width: '48%' }}>
                                        <label style={{ fontWeight: 'bold' }}>End Date</label>
                                        <input
                                            type='date'
                                            style={{ width: '100%', padding: '10px' }}
                                            value={updated_end_date}
                                            onChange={(e) => setUpdatedEndDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <span style={{ display: "flex", alignItems: "center", marginLeft: "100px", marginTop: "8px" }}>
                                    <input
                                        type="checkbox"
                                        style={{ marginRight: "5px" }}
                                        checked={updatedcurrent} // Bind the 'checked' property to the 'current' state
                                        onChange={() => setUpdatedCurrent(!current)} // Toggle the 'current' state when the checkbox is clicked
                                    />
                                    <label style={{ fontWeight: 'bold', marginTop: "11px" }}>Current</label>
                                </span>


                                <div style={{ display: 'flex', marginTop: '20px', marginLeft: '75%' }}>
                                    <button
                                        onClick={() => {
                                            handleUpdate(experience.professional_experience_id, index);
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
                                            handleDelete(experience.professional_experience_id, index);
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

                        <div style={{ width: '100%' }}>
                            <label style={{ fontWeight: 'bold' }}>Job Title</label>
                            <input
                                type='text'
                                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                            />
                        </div>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '20px',
                            }}
                        >





                            <div style={{ width: '48%' }}>
                                <label style={{ fontWeight: 'bold' }}>Organization Name</label>
                                <input
                                    type='text'
                                    style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                                    value={organization}
                                    onChange={(e) => setOrganization(e.target.value)}

                                />
                            </div>
                            <div style={{ width: '48%' }}>
                                <label style={{ fontWeight: 'bold' }}>Location</label>
                                <input
                                    type='text'
                                    style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}

                                />
                            </div>
                        </div>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '20px',
                            }}
                        >
                            <div style={{ width: '48%' }}>
                                <label style={{ fontWeight: 'bold' }}>Start Date</label>
                                <input
                                    type='date'
                                    style={{ width: '100%', padding: '10px' }}
                                    value={start_date}
                                    onChange={(e) => setStartDate(e.target.value)}

                                />
                            </div>
                            <div style={{ width: '48%' }}>
                                <label style={{ fontWeight: 'bold' }}>End Date</label>
                                <input
                                    type='date'
                                    style={{ width: '100%', padding: '10px' }}
                                    value={end_date}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    disabled={current} 
                                />
                            </div>
                        </div>
                        <span style={{ display: "flex", alignItems: "center", marginLeft: "100px", marginTop: "8px" }}>
                            <input
                                type="checkbox"
                                style={{ marginRight: "5px" }}
                                checked={current} // Bind the 'checked' property to the 'current' state
                                onChange={() => setCurrent(!current)} // Toggle the 'current' state when the checkbox is clicked
                            />
                            <label style={{ fontWeight: 'bold', marginTop: "11px" }}>Current</label>
                        </span>


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
                            marginRight: '-132%',
                        }}
                        onClick={() => setShowForm(true)} // Toggle the showForm state to display the form
                    >
                        Add more proffesional experience
                    </span>
                </div>
            </div>
        </>
    )
}

export default ProffesionalExperience
