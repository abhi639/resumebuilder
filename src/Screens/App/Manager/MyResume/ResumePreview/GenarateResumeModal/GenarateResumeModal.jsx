import React, {useEffect, useState} from 'react'
import {DialogComponent} from '@syncfusion/ej2-react-popups'
import './GenarateResumeModal.css'
import ResumeDropdown from '../ResumeDropdown/ResumeDropdown'

export default function GenarateResumeModal({toggleFunction, data}) {
  const [selectedData, setSeletedData] = useState(data)
  const [userName, setUserName] = useState(data?.user?.name)
  const [templateName, setTemplateName] = useState(data?.template?.name)
  const [resumeData, setResumeData] = useState({
    templateId: '',
    userId: '',
    fileName: userName + '_' + templateName,
  })
  useEffect(() => {
    setUserName(selectedData?.user?.name)
    setTemplateName(selectedData?.template?.name)
  }, [selectedData])

  useEffect(() => {
    setResumeData((prev) => ({
      ...prev,
      fileName: userName + '_' + templateName,
    }))
  }, [userName, templateName])

  const [errorMessage, setErrorMessage] = useState('')
  // if (!resumeData.fileName) {
  //   setErrorMessage('Pls Enter Valid version Name')
  // }
  //console.log('selectedData', selectedData)
  let buttons = [
    {
      buttonModel: {
        content: 'Cancel',
        cssClass: 'e-flat btn btn-sm btn-secondary fw-bolder',
      },
      click: () => {
        toggleFunction()
      },
    },
    {
      buttonModel: {
        content: 'Download',
        cssClass: 'e-flat btn btn-sm btn-dark btn-color-white fw-bolder',
        //isPrimary: true,
        //disabled: true,
      },
      click: () => {
        alert(resumeData.fileName + data?.selectedResumeType)
      },
    },
  ]

  function dialogClose() {
    toggleFunction()
  }

  const handleFileNameChange = (event) => {
    setResumeData((prev) => ({
      ...prev,
      fileName: event?.target?.value,
    }))
  }
  return (
    <div className='genarateResumeModal bg-white opacity-100' id='dialog-target'>
      <DialogComponent
        width='45%'
        height={'250px'}
        target='#dialog-target'
        close={dialogClose}
        header='Generate Resume'
        visible={true}
        showCloseIcon={true}
        buttons={buttons}
        isModal={true}
        overlayClick={dialogClose}
        className='modal-dialog'
      >
        <div className=' mx-auto'>
          <div className='content-header'>
            <h3>Specify a version for Genarated Resume</h3>
          </div>
          <div class='input-group mb-3'>
            <input
              type='text'
              class='form-control'
              placeholder='ex:user_template1'
              value={resumeData.fileName}
              aria-label="Recipient's username"
              aria-describedby='basic-addon2'
              onChange={(event) => handleFileNameChange(event)}
            />
            <span class='input-group-text bg-secondary fw-bolder' id='basic-addon2'>
              {data?.selectedResumeType}
            </span>
          </div>
          <div className='text-danger my-2 text-start'>
            {errorMessage && <span className=''>{errorMessage}</span>}
          </div>
        </div>
      </DialogComponent>
    </div>
  )
}
