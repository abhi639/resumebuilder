import { faPlus, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { addEducation } from '../../../Store/App/Manager/addEducation';
import { useDispatch, useSelector } from 'react-redux';
import SavedEducationContent from './SavedEducationContent';
import { getEducation } from '../../../Store/App/Manager/getEducation';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const EducationContent = () => {
  const [showForm, setShowForm] = useState(false);
  const [savedEducationData, setSavedEducationData] = useState([]);
  const dispatch = useDispatch();

  const alleducation = useSelector((state) => state.getEducation);

  const validationSchema = Yup.object().shape({
    university: Yup.string().required('University is required'),
    degree: Yup.string().required('Degree is required'),
    startDate: Yup.date()
    .required('Start Date is required')
    .test(
      'start-date',
      'Start Date must be today or in the past',
      function (value) {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set hours to 0 to compare dates without time
        return !value || new Date(value) <= currentDate;
      }
    ),

  endDate: Yup.date()
    .required('End Date is required')
    .test(
      'end-date',
      'End Date must be less than or equal to today and greater than Start Date',
      function (value) {
        const { startDate } = this.parent;
        const currentDate = new Date();
        const isEndDateValid =
          (!startDate || new Date(value) > new Date(startDate)) &&
          new Date(value) <= currentDate;
        return isEndDateValid;
      }
    ),
});

  const formik = useFormik({
    initialValues: {
      university: '',
      degree: '',
      startDate: '',
      endDate: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleSave(values);
    },
  });

  const handleSave = (values) => {
    const data = {
      school_college: values.university,
      degree: values.degree,
      start_date: values.startDate,
      end_date: values.endDate,
    };

    dispatch(addEducation(data));
    setSavedEducationData([...savedEducationData, data]);
    formik.resetForm(); // Reset the form after submission
    setShowForm(false);
  };

  const toggleCollapse = () => {
    setShowForm(!showForm);
  };

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getEducation(user.user_id));
  }, [user]);

  useEffect(() => {
    if (alleducation.educationData) {
      setSavedEducationData(alleducation.educationData);
    }
  }, [alleducation.educationData]);

  return (
    <div style={{ marginTop: '5%' }}>
      <SavedEducationContent savedEducationData={savedEducationData} />
      {showForm && (
        <div
          style={{
            border: '2px solid #D3D3D3',
            padding: '20px',
            borderRadius: '-1px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {savedEducationData.map((education, index) => (
            <div key={index}>
              <div
                onClick={() => {
                  // Handle dropdown arrow click here
                }}
              >
                {/* <FontAwesomeIcon
                  icon={showForm ? faAngleUp : faAngleDown}
                  onClick={toggleCollapse}
                /> */}
              </div>
            </div>
          ))}
          <form onSubmit={formik.handleSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%', marginBottom: '20px' }}>
              <div style={{ width: '48%' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '10px' }}>University/College/School</label>
                <input
                  type='text'
                  style={{ width: '113%', padding: '10px', marginBottom: '10px' }}
                  id="university"
                  name="university"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.university}
                  placeholder='Enter University/College/School'
                />
                {formik.touched.university && formik.errors.university && (
                  <div style={{ color: 'red' }}>{formik.errors.university}</div>
                )}
              </div>
              <div style={{ width: '48%' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '10px' ,marginLeft:'19%'}}>Degree</label>
                <input
                  type='text'
                  style={{ width: '113%', padding: '10px', marginBottom: '10px' ,marginLeft:'19%'}}
                  id="degree"
                  name="degree"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.degree}
                  placeholder='Enter Degree'
                />
                {formik.touched.degree && formik.errors.degree && (
                  <div style={{ color: 'red' }}>{formik.errors.degree}</div>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%', marginBottom: '20px' }}>
              <div style={{ width: '48%' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '10px' }}>Start Date</label>
                <input
                  type='date'
                  style={{ width: '113%', padding: '10px' }}
                  id="startDate"
                  name="startDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.startDate}
                />
                {formik.touched.startDate && formik.errors.startDate && (
                  <div style={{ color: 'red' }}>{formik.errors.startDate}</div>
                )}
              </div>
              <div style={{ width: '48%' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '10px',marginLeft:'19%' }}>End Date</label>
                <input
                  type='date'
                  style={{ width: '113%', padding: '10px',marginLeft:'19%' }}
                  id="endDate"
                  name="endDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.endDate}
                />
                {formik.touched.endDate && formik.errors.endDate && (
                  <div style={{ color: 'red' }}>{formik.errors.endDate}</div>
                )}
              </div>
            </div>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: 'black',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                marginTop: '20px',
                marginLeft: '48%',
              }}
            >
              Save
            </button>
          </form>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '1rem',
          alignItems: 'center',
          marginRight: '79%',
          whiteSpace: 'nowrap',
        }}
      >
        <FontAwesomeIcon icon={faPlus} style={{ color: '#000', marginRight: '0.5rem' }} />
        <span
          style={{
            color: '#000',
            cursor: 'pointer',
            marginRight: '-45%',
          }}
          onClick={() => toggleCollapse()} 
        >
          Add More Education
        </span>
      </div>
    </div>
  )
}

export default EducationContent;
