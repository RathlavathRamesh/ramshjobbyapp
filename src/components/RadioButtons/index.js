import './index.css'
import {Component} from 'react'

class RadioButtons extends Component {
  render() {
    const {item} = this.props
    // const {salaryRangeId} = item
    return (
      <li className="chekbox">
        <input
          type="radio"
          id={item.salaryRangeId}
          name="salary"
          value={item.salaryRangeId}
        />
        <label htmlFor={item.salaryRangeId} className="labeltext">
          {item.label}
        </label>
      </li>
    )
  }
}
export default RadioButtons
