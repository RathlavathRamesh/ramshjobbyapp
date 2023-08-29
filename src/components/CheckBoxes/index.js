import './index.css'
import {Component} from 'react'

class Checkbox extends Component {
  render() {
    const {item, func} = this.props
    const {employmentTypeId} = item
    const sendanswer = event => {
      func(event)
    }
    return (
      <li className="chekbox">
        <input
          type="checkbox"
          id={item.label}
          value={employmentTypeId}
          onChange={sendanswer}
        />
        <label className="labeltext" htmlFor={item.label}>
          {item.label}
        </label>
      </li>
    )
  }
}
export default Checkbox
