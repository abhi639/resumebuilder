import React, {Component} from 'react'
import './TemplateDropdown.css'
export default class TemplateDropdown extends Component {
  constructor(props) {
    super(props)

    // @defaultSelectText => Show default text in select
    // @showOptionList => Show / Hide List options
    // @optionsList => List of options
    this.state = {
      defaultSelectText: '',
      showOptionList: false,
      optionsList: [],
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
      !e.target.classList.contains('custom-select-option2') &&
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
    this.setState({
      // defaultSelectText: e.target.getAttribute('data-name'),
      showOptionList: false,
    })
  }

  render() {
    const {showOptionList, defaultSelectText} = this.state
    return (
      <div className='Template w-100'>
        <div className='custom-select-container2'></div>
      </div>
    )
  }
}
