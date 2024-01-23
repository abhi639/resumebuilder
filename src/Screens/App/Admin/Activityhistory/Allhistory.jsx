import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  PasteCleanup,
  Toolbar,
  Font,
  FontSize,
  FontColorModel,
} from '@syncfusion/ej2-react-richtexteditor'
import React, {useState, useRef} from 'react'
import {useHistory} from 'react-router-dom'

function Allhistory() {
  const history = useHistory()
  const Handlebutonclick = (props) => {
    history.push(props)
  }

  return (
    <>
      <button
        style={{
          cursor: 'pointer',
          color: 'rgba(0, 0, 0, 0.87)',
          border: '3px solid #dee2e6',
          padding: '10px',
          borderRadius: '0 5px 5px 0',
          backgroundColor: '#dee2e6',
          width: '143px',
          height: '42px',
        }}
        onClick={() => Handlebutonclick('/addtemplate')}
      >
        Back
      </button>
    </>
  )
}

export default Allhistory
