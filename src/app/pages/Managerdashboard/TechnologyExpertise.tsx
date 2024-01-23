import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns"
import { useEffect, useState } from "react";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';

import axios from "axios";

interface Option {
    value: string;
    label: string;
}
interface Technology {
    technology_id: number;
    technology_name: string;
    modified_by: string | null;
    modified_on: string;
    users: any[]; // You may want to replace 'any[]' with the actual type of the 'users' property
    _deleted: boolean;
}
interface TechnologyOption {
    value: string;
    label: string;
}
const TechnologyExpertise = (props: any) => {
    const skills = ['Java', 'Python', 'C#', 'Javascript', 'Ruby', 'HTML', 'CSS'];
    const familartech = ['Selenium', 'Appium', 'TestSigma', 'Javascript'];
    const database = ['MongoDB', 'MariaDB', 'SQLite'];
    const frameworks = ['React', 'Angular', 'Vue', 'Laravel', 'Django', 'Flask', 'Flutter'];
    const [filteredSkills, setFilteredSkills] = useState(skills);
    const [filteredDatabases, setFilteredDatabases] = useState(database);
    const [filteredFrameworks, setFilteredFrameworks] = useState(frameworks);
    const [filteredfamilartech, setfamilartech] = useState(familartech);

    const [proficientOptions, setProficientOptions] = useState<Option[]>([]);
    const [familiarOptions, setFamiliarOptions] = useState<Option[]>([]);
    const [databaseOptions, setDatabaseOptions] = useState<Option[]>([]);
    const [frameworkOptions, setFrameworkOptions] = useState<Option[]>([]);

    const divStyle = {
        marginBottom: '15px',
    };


    const renderSuggestions = (suggestions: any, className: any) => {
        return suggestions.map((suggestion: any, index: any) => (
            <span
                key={index}
                className={className}>
                + {suggestion}
            </span>
        ));
    };


    const [technologyOptions, setTechnologyOptions] = useState<TechnologyOption[]>([]);

    const fetchTechnologies = async () => {
        try {
            const response = await axios.get('http://localhost:8082/api/technologies/list');
            const data: Technology[] = response.data;

            // Extracting technology names from the array of objects
            const options = data.map(technology => ({
                value: technology.technology_name,
                label: technology.technology_name,
            }));

            // Set the technologyOptions state with the transformed data
            setTechnologyOptions(options);


        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };


    // Fetch technologies when the component mounts
    useEffect(() => {
        fetchTechnologies();
    }, []);


    const customStyles = {
        menuList: (base: any, state: any) => ({
            ...base,
            maxHeight: '200px', // Set the maximum height as needed
            overflowY: 'auto',
            // Add vertical scrollbar
        }),
        option: (base: any, state: any) => ({
            ...base,
            height: '40px', // Adjust the height as needed
        }),
        menu: (base: any, state: any) => ({
            ...base,
            width: '150px', // Adjust the width as needed
        }),
    };



    const handleCreate = async (inputValue: string, setOptions: React.Dispatch<React.SetStateAction<Option[]>>) => {
        const newOption: Option = { value: inputValue, label: inputValue };
        const technology_name = { technology_name: inputValue };
        console.log(technology_name)
        try {
            const response = await axios.post('http://localhost:8082/api/technologies/add', technology_name, {
                headers: {
                    'Content-Type': 'application/json',
                    // Additional headers if needed
                },
            });

            if (response.status === 201) {
                // If the API call is successful, update the state with the new option
                setOptions((prevOptions) => [...prevOptions, newOption]);
            } else {
                // Handle error scenarios
                console.error('Failed to add option to the database');
            }
        } catch (error) {
            console.error('Error adding option to the database:', error);
        }
        
    };
   
    const handleSave = async () => {
        try {
            // Gather data to send to the backend
            const dataToSend = {
                proficient_in: proficientOptions.map((option) => option.value).join(', '),
                familiar_with: familiarOptions.map((option) => option.value).join(', '),
                database_skills: databaseOptions.map((option) => option.value).join(', '),
                frameworks: frameworkOptions.map((option) => option.value).join(', '),
                
            };
    
            console.log(dataToSend);
    
            // Make API call to save data
            const response = await axios.post('http://localhost:8082/api/technology-expertise/add', dataToSend);
    
            // Handle response as needed
            console.log('Save successful:', response.data);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };
    

    return (
        <>
            <div style={{ ...divStyle, marginTop: '25px' }}>
                <h6>Proficient in</h6>
                {/* <MultiSelectComponent id="mtselement" popupHeight='250px' popupWidth='250px' dataSource={skills} cssClass="custom-multiselect" allowCustomValue/> */}
                <CreatableSelect
                    isMulti
                    styles={customStyles}
                    options={technologyOptions}
                    value={proficientOptions}
                    onChange={(newOptions) => setProficientOptions(newOptions as Option[])}
                    onCreateOption={(inputValue) => handleCreate(inputValue, setProficientOptions)}
                />
                {/* <br />
                <p>Suggestions &nbsp;
                    {renderSuggestions(filteredSkills, "badge badge-pill badge-secondary text-dark badge-lg mx-1")}
                </p> */}

            </div>
            <br />

            <div style={divStyle}>
                <h6>Familiar with</h6>
                <CreatableSelect
                    isMulti
                    styles={customStyles}
                    options={technologyOptions}
                    value={familiarOptions}
                    onChange={(newOptions) => setFamiliarOptions(newOptions as Option[])}
                    onCreateOption={(inputValue) => handleCreate(inputValue, setFamiliarOptions)}
                />
                {/* <br />
                <p>Suggestions &nbsp;
                    {renderSuggestions(filteredfamilartech, "badge badge-pill badge-secondary text-dark badge-lg mx-1")}
                </p> */}

            </div>
            <br />

            <div style={divStyle}>
                <h6>Databases</h6>

                <CreatableSelect
                    isMulti
                    styles={customStyles}
                    options={technologyOptions}
                    value={databaseOptions}
                    onChange={(newOptions) => setDatabaseOptions(newOptions as Option[])} // Use as Option[]
                    onCreateOption={(inputValue) => handleCreate(inputValue, setDatabaseOptions)}
                />
                {/* <br />
                <p>Suggestions &nbsp;
                    {renderSuggestions(filteredDatabases, "badge badge-pill badge-secondary text-dark badge-lg mx-1")}
                </p> */}

            </div>
            <br />
            <div style={divStyle}>
                <h6>Frameworks</h6>
                <CreatableSelect
                    isMulti
                    styles={customStyles}
                    options={technologyOptions}
                    value={frameworkOptions}
                    onChange={(newOptions) => setFrameworkOptions(newOptions as Option[])} // Use as Option[]
                    onCreateOption={(inputValue) => handleCreate(inputValue, setFrameworkOptions)}
                />
                {/* <br />
                <p>Suggestions &nbsp;
                    {renderSuggestions(filteredFrameworks, "badge badge-pill badge-secondary text-dark badge-lg mx-1")}
                </p> */}

            </div>
            <button
              type='button'
             onClick={handleSave}
              style={{
                padding: '5px 10px',
                borderRadius: '5px',
                backgroundColor: 'black',
                marginTop: '4%',
                width: '12%',
                marginLeft: '88%',
              }}
            >
              Save
            </button>
        </>
    )
}
export default TechnologyExpertise;