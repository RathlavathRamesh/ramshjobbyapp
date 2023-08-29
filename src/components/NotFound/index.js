import './index.css'
import {Component} from 'react'

class NotFoundc extends Component {
  render() {
    return (
      <div className="notfoundcontainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="notfound"
        />
        <h1 className="empheading">Page Not Found</h1>
        <p className="rate">
          We are sorry, the page you requested could not be found
        </p>
      </div>
    )
  }
}
export default NotFoundc
