import './richtext.css'
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  NodeSelection,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from '@syncfusion/ej2-react-richtexteditor'
import * as React from 'react'
import {PageDescription, PageTitle} from '../../../../_metronic/layout/core'
import {useHistory} from 'react-router-dom'
import {Link as Linker} from 'react-router-dom'
import {DialogComponent} from '@syncfusion/ej2-react-popups'
import axios from 'axios'
import {IToolsItems} from '@syncfusion/ej2-react-richtexteditor'
import {useSelector} from 'react-redux'
import {DropDownList} from '@syncfusion/ej2-react-dropdowns'

function Mainresume() {
  const history = useHistory()
  const [data1, setdata1] = React.useState()
  let saveSelection
  let range
  const user = useSelector(({auth}) => auth)
  console.log('user', user)
  let rteObj = React.useRef('')
  let rteObj2 = React.useRef('')
  let rteObj3 = React.useRef('')
  let rteObj4 = React.useRef('')
  const selection = new NodeSelection()
  // set the value to Rich Text Editor

  // Rich Text Editor items list
  const items1 = [
    'Bold',
    'Italic',
    'Underline',
    '|',
    'Formats',
    'Alignments',
    'OrderedList',
    'UnorderedList',
    '|',
    {
      tooltipText: 'Insert',
      template:
        '<button class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar"  style="width:100%"></button>',
    },
    '|',
    {
      tooltipText: 'Insert',
      template:
        '<button class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar1"  style="width:100%"></button>',
    },
    '|',
    'CreateLink',
    'Image',
    '|',
    'SourceCode',
    'Undo',
    'Redo',
    'Print',
  ]

  const items2 = [
    'Bold',
    'Italic',
    'Underline',
    '|',
    'Formats',
    'Alignments',
    'OrderedList',
    'UnorderedList',
    'CreateLink',
    'Image',
    '|',
    {
      tooltipText: 'Insert',
      template:
        '<button class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar2"  style="width:100%"></button>',
    },
    '|',
    'SourceCode',
    'Undo',
    'Redo',
    'Print',
  ]
  const items3 = [
    'Bold',
    'Italic',
    'Underline',
    '|',
    'Formats',
    'Alignments',
    'OrderedList',
    'UnorderedList',
    'CreateLink',
    'Image',
    '|',
    {
      tooltipText: 'Insert',
      template:
        '<button class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar3"  style="width:100%"></button>',
    },
    '|',
    'SourceCode',
    'Undo',
    'Redo',
    'Print',
  ]
  const items4 = [
    'Bold',
    'Italic',
    'Underline',
    '|',
    'Formats',
    'Alignments',
    'OrderedList',
    'UnorderedList',
    'CreateLink',
    'Image',
    '|',
    {
      tooltipText: 'Insert',
      template:
        '<button class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar4"  style="width:100%"></button>',
    },
    '|',
    'SourceCode',
    'Undo',
    'Redo',
    'Print',
  ]

  const toolbarSettings1 = {
    items: items1,
  }
  const toolbarSettings2 = {
    items: items2,
  }
  const toolbarSettings3 = {
    items: items3,
  }
  const toolbarSettings4 = {
    items: items4
};
   
function select(e) {
  saveSelection.restore();
  if (e.itemData && e.itemData.placeholder) {
  rteObj.current.executeCommand('insertText', e.itemData.placeholder);
  }
  
}
function select2(e) {
  saveSelection.restore();
  if (e.itemData && e.itemData.placeholder) {
  rteObj2.current.executeCommand('insertText', e.itemData.placeholder);
  }
}
function select3(e) {
  saveSelection.restore();
  if (e.itemData && e.itemData.placeholder) {
    rteObj3.current.executeCommand('insertText', e.itemData.placeholder);
  }
  
  
}
function select4(e) {
  saveSelection.restore();
  if (e.itemData && e.itemData.placeholder) {
  rteObj4.current.executeCommand('insertText', e.itemData.placeholder);
  }
  
}
function beforeOpen(e) {
  range = selection.getRange(document);
  
  saveSelection = selection.save(range, document);
}
      
    const [templateData, setTemplateData] = React.useState({
      template_name: '',
      profile_summary: '',
      professional_experience: '',
      projects: '',
      certificates: '',
      modified_by:user.user.user_id
  });
  //templateData.profile_summary = `<div class="e-content e-lib e-keyboard" id="defaultRTE_rte-edit-view" contenteditable="true" tabindex="0"><p>Summary</p><p><br></p><p>Academic: </p><p><br></p><p>Years of Experience: </p><p>Current Role: </p><p><br></p><p>Technology Expertise</p><p>Proficient in: </p><p>Familiar with:</p><p>Databases: </p><p>Framework: </p><p>Professional Summary:</p><p><br></p><p><p></p></p><p></p></div>`;
  console.log('user id', user.user.user_id)
  function onRichTextChange(editorName, content) {
    setTemplateData((prevData) => ({
      ...prevData,
      [editorName]: content,
    }))
  }
  console.log('object', rteObj)
  const [post, setPost] = React.useState(null)
  function saveTemplateData() {
    if (!templateData.template_name) {
      const nullFields = []
      if (!templateData.template_name) nullFields.push('template_name')

      alert(`${nullFields} is empty `)
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`, // Replace with your actual authorization header
        },
      }

      console.log('token=', config.headers.Authorization)
      // // Send an HTTP request to delete the item with the given ID
      axios
        .post(`http://localhost:8082/templates/addTemplate`, templateData, config)

        .then((response) => {
          console.log('response.data', response.data)
          // Update the data source after successful deletion
          if (response.status === 200) {
            console.log('Data posted successfully:', response.data)
            history.push('/addtemplate')
          }
        })
        .catch((error) => {
          // Handle any error that occurs during deletion
          console.error('Error posting data:', error)
        })
      console.log('template data==', templateData)
    }
  }
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
        const response = await axios.get(
          'http://localhost:8082/placeholder/getPlaceholders',
          config
        )
        setdata1(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [])
  React.useEffect(() => {
    if (data1) {
      const listObj = new DropDownList({
        dataSource: data1.profile, // Your data source
        fields: {text: 'name'}, // Field mappings for text
        placeholder: 'Profile', // Placeholder text
        popupHeight: '200px', // Height of the popup
        popupWidth:'200px',
        
        change: function (e) {
          // Event handler for change
          select.bind(this)(e);
          // Reset the selected value after handling the change event
          listObj.clear();
        
      },
        open: beforeOpen.bind(this), // Event handler for before open
      })
      listObj.appendTo('#custom_tbar')
    }
  }, [data1])
  React.useEffect(() => {
    if (data1) {
      const listObj = new DropDownList({
        dataSource: data1.technology, // Your data source
        fields: {text: 'name'}, // Field mappings for text
        placeholder: 'technology', // Placeholder text
        popupHeight: '200px', // Height of the popup
        popupWidth:'200px',
        value: 'technology',
        change: function (e) {
          // Event handler for change
          select.bind(this)(e);
          // Reset the selected value after handling the change event
          listObj.clear();
        
      },
        open: beforeOpen.bind(this), // Event handler for before open
      })
      listObj.appendTo('#custom_tbar1')
    }
  }, [data1])
  React.useEffect(() => {
    if (data1) {
      const listObj = new DropDownList({
        dataSource: data1.experience, // Your data source
        fields: {text: 'name'}, // Field mappings for text
        placeholder: 'Experience', // Placeholder text
        popupHeight: '200px', // Height of the popup
        popupWidth:'200px',
     value:'Experience',
        change: function (e) {
          // Event handler for change
          select2.bind(this)(e);
          // Reset the selected value after handling the change event
          listObj.clear();
        
      },
        open: beforeOpen.bind(this), // Event handler for before open
      })
      listObj.appendTo('#custom_tbar2')
    }
  }, [data1])
  React.useEffect(() => {
    if (data1) {
      const listObj = new DropDownList({
        dataSource: data1.project, // Your data source
        fields: {text: 'name'}, // Field mappings for text
        placeholder: 'Project', // Placeholder text
        popupHeight: '200px', // Height of the popup
        popupWidth:'200px',
        value:"project",
        change: function (e) {
          // Event handler for change
          select3.bind(this)(e);
          // Reset the selected value after handling the change event
          listObj.clear();
        
      },
        
        beforeOpen: beforeOpen.bind(this), // Event handler for before open
      });
      listObj.appendTo('#custom_tbar3');
    }
  }, [data1])
  React.useEffect(() => {
    if (data1) {
      const listObj = new DropDownList({
        dataSource: data1.certificates, // Your data source
        fields: {text: 'name'}, // Field mappings for text
        placeholder: 'Certificates', // Placeholder text
        popupHeight: '200px', // Height of the popup
        popupWidth:'200px',
         value:'Certificates',
        change: function (e) {
          // Event handler for change
          select4.bind(this)(e);
          // Reset the selected value after handling the change event
          listObj.clear();
        
      }, // Event handler for change
        open: beforeOpen.bind(this), // Event handler for before open
      });
      listObj.appendTo('#custom_tbar4');
    
    }
  }, [data1])
  
    return (
<>
    <PageTitle  children='Add Template'description=''breadcrumbs='/'></PageTitle>
    <div style={{margin:'1%'}} className="templates">
    <table style={{width:'100%',marginRight:'10%'}}class="table table-bordered">
    <tbody >
        <tr>
          <td style={{width:'10%'}}>
          <label  class="col-form-label">Template name</label>

          </td>
          <td style={{width:'80%'}}> <input style={{width:'50%'}} value={templateData.template_name} onChange={(e) =>
        setTemplateData({ ...templateData, template_name: e.target.value })
    }type="text" id="template_name" class="form-control" aria-describedby="passwordHelpInline"/></td>
        </tr>
        <tr style={{height:'300px'}}>
          <td style={{width:'10%'}}><label class="">Profile Summary</label></td>
          <td style={{width:'80%'}}> 
           
               
                    <RichTextEditorComponent  ref={(richtexteditor) => {rteObj.current = richtexteditor;}}  valueTemplate={templateData.profile_summary}
                      change={(args) => onRichTextChange('profile_summary', args.value)} width='100%' height='100%'  id="defaultRTE"  toolbarSettings={toolbarSettings1}>
                       
                        <Inject services={[Link, Image, HtmlEditor, Toolbar, QuickToolbar]}/>

                        
                    </RichTextEditorComponent>
                    
        </td>
        </tr>
        <tr>
          <td style={{width:'10%'}}><label  class="col-form-label">Professional Experience</label></td>
          <td style={{width:'80%'}}>  <RichTextEditorComponent  ref={(richtexteditor) => {rteObj2.current = richtexteditor;}} valueTemplate={templateData.professional_experience} change={(args) => onRichTextChange('professional_experience', args.value)}id="defaultRTE"  toolbarSettings={toolbarSettings2}>
                       
                       <Inject services={[Link, Image, HtmlEditor, Toolbar, QuickToolbar]}/>
                   </RichTextEditorComponent></td>
        </tr>
        <tr style={{height:'300px'}}>
          <td style={{width:'10%'}}> <label  class="col-form-label">Projects</label></td>
          <td style={{width:'80%'}}> <RichTextEditorComponent ref={(richtexteditor) => {rteObj3.current = richtexteditor;}}width='100%'  height='100%'id="defaultRTE"  change={(args) => onRichTextChange('projects', args.value)}toolbarSettings={toolbarSettings3}>
                       
                       <Inject services={[Link, Image, HtmlEditor, Toolbar, QuickToolbar]}/>
                   </RichTextEditorComponent></td>
        </tr>
        <tr>
          <td style={{width:'10%'}}> <label  class="col-form-label">Certificates</label></td>
          <td style={{width:'80%'}}><div className='control-section' id="rteSection">
              
          <RichTextEditorComponent ref={(richtexteditor) => {rteObj4.current = richtexteditor;}} id="print" valueTemplate={templateData.certificates} change={(args) => onRichTextChange('certificates', args.value)}toolbarSettings={toolbarSettings4}>
                       
                       <Inject services={[Link, Image, HtmlEditor, Toolbar, QuickToolbar]}/>
                   </RichTextEditorComponent>
             
      </div></td>
        </tr>
        <tr>
      
          
                <td>
             
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <div style={{margin: '0 24%'}}>
                  <Linker to='/addtemplate'>
                    {' '}
                    <button
                      style={{
                        cursor: 'pointer',
                        color: 'rgba(0, 0, 0, 0.87)',

                        padding: '10px',
                        border: '1px solid black',
                        backgroundColor: 'rgb(255 255 255)',
                        width: '143px',
                        height: '42px',
                        // border:'outset'
                      }}
                    >
                      Back
                    </button>
                  </Linker>
                  <button
                    style={{
                      cursor: 'pointer',
                      color: 'rgba(0, 0, 0, 0.87)',

                      padding: '10px',
                      border: '1px solid black',
                      backgroundColor: 'rgb(255 255 255)',
                      width: '143px',
                      height: '42px',
                      margin: '0 2%',
                    }}
                  >
                    Priview
                  </button>

                  <button
                    style={{
                      cursor: 'pointer',
                      color: '#fff',
                      border: '#000',
                      padding: '10px',

                      backgroundColor: 'rgba(0, 0, 0, 0.87)',
                      width: '143px',
                      height: '42px',
                    }}
                    onClick={saveTemplateData}
                  >
                    Save
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
export default Mainresume
