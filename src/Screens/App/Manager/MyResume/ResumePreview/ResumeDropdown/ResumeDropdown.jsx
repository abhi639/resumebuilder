import React, {Component} from 'react'
import './ResumeDropdown.css'
import {KTSVG} from '../../../../../../_metronic/helpers'

// import {ReactComponent as upArrow} from '../../../../../../../public/media/icons/duotune/arrows/arr073.svg'
// import {ReactComponent as DownArrow} from '../../../../../../../public/media/icons/duotune/arrows/arr072.svg'

export default class ResumeDropdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      defaultSelectText: '',
      showOptionList: false,
      //optionsList: [],
    }
  }

  componentDidMount() {
    // Add Event Listner to handle the click that happens outside
    // the Custom Select Container
    document.addEventListener('mousedown', this.handleClickOutside)
    this.setState({
      defaultSelectText: this.props.defaultText,
    })
  }

  componentWillUnmount() {
    // Remove the event listner on component unmounting
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  // This method handles the click that happens outside the
  // select text and list area
  handleClickOutside = (e) => {
    if (
      !e.target.classList.contains('custom-select-option1') &&
      !e.target.classList.contains('selected-text')
    ) {
      this.setState({
        showOptionList: false,
      })
    }
  }

  // This method handles the display of option list
  handleListDisplay = () => {
    this.setState((prevState) => {
      return {
        showOptionList: !prevState.showOptionList,
      }
    })
  }

  // This method handles the setting of name in select text area
  // and list display on selection
  handleOptionClick = (e) => {
    // alert('selected--' + e.target.getAttribute('data-name'))
    this.props.ResumeType(e?.target?.getAttribute('data-name'))
    this.setState({
      // defaultSelectText: e.target.getAttribute('data-name'),
      showOptionList: false,
    })
  }

  render() {
    const {showOptionList, defaultSelectText} = this.state
    return (
      <div className='resume w-100 mt-2 px-2 ' tabIndex={0}>
        <div className='custom-select-container1 w-100 align-top'>
          <div
            className={showOptionList ? 'selected-text active' : 'selected-text'}
            onClick={this.handleListDisplay}
            style={{display: 'flex', justifyContent: 'space-between'}}
          >
            <span
              style={{
                maxWidth: '10ch !important',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {defaultSelectText}
            </span>
            <span className='my-auto'>
              {showOptionList ? (
                <i className='bi bi-chevron-up align-middle' />
              ) : (
                <i className='bi bi-chevron-down align-middle' />
              )}
            </span>
          </div>
          {showOptionList && (
            <ul className='select-options bg-white'>
              <li
                className='custom-select-option1'
                data-name='.Docs'
                onClick={this.handleOptionClick}
              >
                Generate Docs
              </li>
              <li
                className='custom-select-option1'
                data-name='.Pdf'
                onClick={this.handleOptionClick}
              >
                Generate Pdf
              </li>
              <li
                className='custom-select-option1'
                data-name='.OneDrive'
                onClick={this.handleOptionClick}
              >
                Save to OneDrive
              </li>
            </ul>
          )}
        </div>
      </div>
    )
  }
}
