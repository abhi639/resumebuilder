import React, {useEffect, useState} from 'react'
import {renderToString} from 'react-dom/server'

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
  SearchSettingsModel,
} from '@syncfusion/ej2-react-grids'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faEye,
  faEdit,
  faTrash,
  faDownload,
  faCloudArrowDown,
  faMagnifyingGlass,
  faUndo,
} from '@fortawesome/free-solid-svg-icons'
import {DropDownButtonComponent} from '@syncfusion/ej2-react-splitbuttons'
import ResumeDropdown from './ResumeDropdown/ResumeDropdown'
import TemplateDropdown from './TemplateDropdown/TemplateDropdown'
import './resumePreview.css'
import axios from 'axios'
import {useSelector} from 'react-redux'
import GenarateResumeModal from './GenarateResumeModal/GenarateResumeModal'
import GenaratedPreview from './GenaratedPreview/GenaratedPreview'
import TextPreview from './GenaratedPreview/textPreview'
import preview from './GenaratePreview.js'
export default function ResumePreview() {
  const user = useSelector(({auth}) => auth)

  const [modalVisibility, setModalVisibility] = useState(false)
  const [selectedData, setSelectedData] = useState({
    template: {
      id: '',
      name: '',
    },
    user: {
      id: user?.user?.user_id,
      name: user?.user?.full_name,
    },
    selectedResumeType: '.Docs',
  })
  const [genaratedData, setGenaratedData] = useState('')
  const [responseObject, setResponseObject] = useState({
    template_name: null,
    profile_summary: '',
    professional_experience: '',
    projects: '',
    certificates: '',
  })
  useEffect(() => {
    // setGenaratedData(genaratePreview('vinit', '', ''))
    setGenaratedData(preview(user?.user?.full_name, '', responseObject))
    console.log('response', responseObject)
  }, [responseObject])

  useEffect(() => {
    api()
    // setSelectedData((prev) => ({
    //   ...prev,
    //   user: {
    //     id: user?.user?.user_id,
    //     name: user?.user?.full_name,
    //   },
    // }))
  }, [user])

  const [templatesList, setTemplatesList] = useState([])
  const [data, setData] = useState([])
  useEffect(() => {
    setData(templatesList)
  }, [templatesList])

  const api = () => {
    axios
      .get('http://localhost:8082/templates/getallTemplates', {
        header: {
          Authorization: `Bearer ${user.accssToken}`,
        },
      })
      .then((res) => {
        setTemplatesList(res.data)
        // templatesList.map((ele) => {
        //   console.log('templates', ele)
        // })
      })
      .catch(function (error) {
        console.log('error ', error)
      })
  }

  useEffect(() => {
    replaceTemplate(selectedData?.template?.id, selectedData?.user?.id)
  }, [selectedData])

  //api call to replace template placeholders
  const replaceTemplate = (templateId, userId) => {
    axios
      .get(`http://localhost:8082/templates/replace/${templateId}/${userId}`, {
        header: {
          Authorization: `Bearer ${user.accssToken}`,
        },
      })
      .then((res) => {
        setResponseObject(res.data.data)
      })
      .catch(function (error) {
        console.log('error ' + error)
      })
  }

  const handleModal = () => {
    setModalVisibility((prev) => {
      return !prev
    })
  }
  const handleTemplateChange = (event) => {
    if (event.target.value) {
      setSelectedData((prev) => ({
        ...prev,
        template: {
          id: event.target.value,
          name: data
            .filter((template) => template.template_id == event.target.value)
            .map((template) => {
              return template.template_name
            })[0],
        },
      }))
    } else {
      setSelectedData((prev) => ({
        ...prev,
        template: {
          id: '',
          name: '',
        },
      }))
    }
  }
  // const jsx = htmlToJsx('<h1 tabindex="0">Hello World!</h1>')
  // const previewText = renderToString(<TextPreview />)

  const handleResumeTypeSelect = (data) => {
    setSelectedData((prev) => ({
      ...prev,

      selectedResumeType: data,
    }))
    handleModal()
  }

  return (
    <div className='preview m-75'>
      <div className='d-flex flex-row justify-content-between   previewHeader  opacity-75'>
        <div className='w-20 fw-900 pt-2 align-items-end' style={{fontSize: '20px'}}>
          <b>Preview</b>
        </div>
        <div
          className='w-80'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            gap: '5px',
          }}
        >
          {/* <DropDownListComponent
              dataSource={templateOptions}
              placeholder='Select Template'
              cssclassName=' bg-while w-50'
              onChange={(event) => {
                alert(event.target.value)
              }}
            /> */}
          <div className='w-50'>
            <select
              className='form-select form-select-sm w-100 Templates'
              aria-label='Select Template'
              style={{height: '30px'}}
              aria-expanded='true'
              id='templates'
              onChange={(event) => {
                handleTemplateChange(event)
              }}
            >
              <option value=''>Select Template</option>
              {data ? (
                <>
                  {data.map((ele) => (
                    <>
                      <option value={ele.template_id} key={ele.template_id}>
                        {ele.template_name}
                      </option>
                    </>
                  ))}
                </>
              ) : (
                <>
                  <option value=''>No Templates Presents</option>
                </>
              )}
            </select>

            {/* <TemplateDropdown /> */}
          </div>
          {/* <select
            className='form-select form-select-sm w-30 Resumes '
            //aria-label='Generate Resume'
            placeholder='Resume'
            onChange={(event) => {
              alert(event.target.value)
            }}
          >
            <option>Generate Resume</option>
            <option value='1'>&#xf019; Generate as Docs</option>
            <option value='2'>&#xf019; Generate as Pdf</option>
            <option value='3'>&#xf019; Save to OneDrive</option>
          </select> */}
          <div className='w-50 Resumes align-top ' style={{}}>
            <ResumeDropdown defaultText={'Generate Resume'} ResumeType={handleResumeTypeSelect} />
            {/* <div className='btn btn-secondary btn-sm fw-bold' onClick={handleModal}>
              Genarate Resume
            </div> */}
            {modalVisibility && (
              <GenarateResumeModal toggleFunction={handleModal} data={selectedData} />
            )}
          </div>
        </div>
      </div>
      <div className='card card-custom w-100 ResumePrview'>
        <div
          className='card-body bg-white opacity-75 '
          style={{maxHeight: '85vh', minHeight: '80vh', overflow: 'auto', padding: '10px'}}
        >
          {/* <div>
            <p>
              Lorem ipsum dolor sit amet. Qui sunt quam et voluptatum architecto aut sapiente
              exercitationem ut laboriosam totam At eius sapiente ab adipisci velit est minima
              dolore. Non vitae nostrum non reiciendis dolorem et velit fugit id consequatur
              recusandae rem sint aspernatur et vitae maxime. Ut velit corporis aut voluptatibus
              voluptatem qui internos galisum?{' '}
            </p>
            <p>
              Qui excepturi accusamus et atque quod sit vitae quae 33 quaerat repudiandae? Et quis
              omnis et esse consequatur ut voluptas facilis rem dolore nesciunt. Ut sunt corporis ex
              voluptatibus galisum At numquam molestiae est officia tenetur ut adipisci animi ea
              temporibus quod.{' '}
            </p>
            <p>
              Sit adipisci quia sed eaque voluptatem et suscipit quia aut harum nobis ut architecto
              voluptatem vel consequatur amet. Nam nisi omnis 33 voluptatem reprehenderit et quam
              quia eos nihil repudiandae sed quod architecto. Id omnis dolorem aut obcaecati
              doloremque rem vero modi ut harum dicta qui quidem sunt vel sunt aliquid. Vel
              perferendis facilis et enim repudiandae ab omnis asperiores?{' '}
            </p>
            <p>
              Lorem ipsum dolor sit amet. Qui sunt quam et voluptatum architecto aut sapiente
              exercitationem ut laboriosam totam At eius sapiente ab adipisci velit est minima
              dolore. Non vitae nostrum non reiciendis dolorem et velit fugit id consequatur
              recusandae rem sint aspernatur et vitae maxime. Ut velit corporis aut voluptatibus
              voluptatem qui internos galisum?{' '}
            </p>
            <p>
              Qui excepturi accusamus et atque quod sit vitae quae 33 quaerat repudiandae? Et quis
              omnis et esse consequatur ut voluptas facilis rem dolore nesciunt. Ut sunt corporis ex
              voluptatibus galisum At numquam molestiae est officia tenetur ut adipisci animi ea
              temporibus quod.{' '}
            </p>
            <p>
              Sit adipisci quia sed eaque voluptatem et suscipit quia aut harum nobis ut architecto
              voluptatem vel consequatur amet. Nam nisi omnis 33 voluptatem reprehenderit et quam
              quia eos nihil repudiandae sed quod architecto. Id omnis dolorem aut obcaecati
              doloremque rem vero modi ut harum dicta qui quidem sunt vel sunt aliquid. Vel
              perferendis facilis et enim repudiandae ab omnis asperiores?{' '}
            </p>
            <p>
              Lorem ipsum dolor sit amet. Qui sunt quam et voluptatum architecto aut sapiente
              exercitationem ut laboriosam totam At eius sapiente ab adipisci velit est minima
              dolore. Non vitae nostrum non reiciendis dolorem et velit fugit id consequatur
              recusandae rem sint aspernatur et vitae maxime. Ut velit corporis aut voluptatibus
              voluptatem qui internos galisum?{' '}
            </p>
            <p>
              Qui excepturi accusamus et atque quod sit vitae quae 33 quaerat repudiandae? Et quis
              omnis et esse consequatur ut voluptas facilis rem dolore nesciunt. Ut sunt corporis ex
              voluptatibus galisum At numquam molestiae est officia tenetur ut adipisci animi ea
              temporibus quod.{' '}
            </p>
            <p>
              Sit adipisci quia sed eaque voluptatem et suscipit quia aut harum nobis ut architecto
              voluptatem vel consequatur amet. Nam nisi omnis 33 voluptatem reprehenderit et quam
              quia eos nihil repudiandae sed quod architecto. Id omnis dolorem aut obcaecati
              doloremque rem vero modi ut harum dicta qui quidem sunt vel sunt aliquid. Vel
              perferendis facilis et enim repudiandae ab omnis asperiores?{' '}
            </p>
            <p>
              Lorem ipsum dolor sit amet. Qui sunt quam et voluptatum architecto aut sapiente
              exercitationem ut laboriosam totam At eius sapiente ab adipisci velit est minima
              dolore. Non vitae nostrum non reiciendis dolorem et velit fugit id consequatur
              recusandae rem sint aspernatur et vitae maxime. Ut velit corporis aut voluptatibus
              voluptatem qui internos galisum?{' '}
            </p>
            <p>
              Qui excepturi accusamus et atque quod sit vitae quae 33 quaerat repudiandae? Et quis
              omnis et esse consequatur ut voluptas facilis rem dolore nesciunt. Ut sunt corporis ex
              voluptatibus galisum At numquam molestiae est officia tenetur ut adipisci animi ea
              temporibus quod.{' '}
            </p>
            <p>
              Sit adipisci quia sed eaque voluptatem et suscipit quia aut harum nobis ut architecto
              voluptatem vel consequatur amet. Nam nisi omnis 33 voluptatem reprehenderit et quam
              quia eos nihil repudiandae sed quod architecto. Id omnis dolorem aut obcaecati
              doloremque rem vero modi ut harum dicta qui quidem sunt vel sunt aliquid. Vel
              perferendis facilis et enim repudiandae ab omnis asperiores?{' '}
              <p>
                Lorem ipsum dolor sit amet. Qui sunt quam et voluptatum architecto aut sapiente
                exercitationem ut laboriosam totam At eius sapiente ab adipisci velit est minima
                dolore. Non vitae nostrum non reiciendis dolorem et velit fugit id consequatur
                recusandae rem sint aspernatur et vitae maxime. Ut velit corporis aut voluptatibus
                voluptatem qui internos galisum?{' '}
              </p>
            </p>
          </div> */}
          {/* <GenaratedPreview /> */}
          {/* <div
            dangerouslySetInnerHTML={{
              __html: `<header>
          <div class='d-flex flex-column w-100'>
            <div class='' style='text-align: end'>
             <image src="./QuadwaveLogo/Quadwave-Logo.png" alt="Logo"/>
            </div>
            <div class='' style='text-align: center'>
              <span>${user.user.full_name}</span>
            </div>
          </div>
        </header><hr/>
        <section><ul><li><div><span>DTX.company , Pune as a Team lead</span></div></li></ul><ul><li><div><span>Fca.org , Mysore as a Java Developer </span></div></li></ul><ol><li>Text generator - Kvn.co</li><ul><li>Technologies:java,Spring,Mysql</li><li>Environment: Java web Developement</li></ul></ol><ol><li>Cookery webApp - cookery.io</li><ul><li>Technologies:Embeded Systems</li><li>Environment: Embeded Systems</li></ul></ol></section>`,
            }}
          /> */}
          <div
            dangerouslySetInnerHTML={{
              __html: genaratedData,
            }}
          />
          {/* <div dangerouslySetInnerHTML={{__html: renderToString(<GenaratedPreview />)}}></div> */}
          {/* <div dangerouslySetInnerHTML={{_html: previewText}}></div> */}
        </div>
      </div>
    </div>
  )
}
