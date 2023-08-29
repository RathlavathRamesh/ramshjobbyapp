import './index.css'
import {Component} from 'react'
import {BsFillStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {AiOutlineMail} from 'react-icons/ai'

class SimilarJob extends Component {
  render() {
    const {item} = this.props
    console.log(item)
    return (
      <li className="similarItem">
        <div className="logoandRole">
          <img
            src={item.companyLogoUrl}
            alt="similar job company logo"
            className="similar job company logo"
          />
          <div>
            <h1 className="empheading">{item.title}</h1>
            <div className="rating">
              <BsFillStarFill className="star" />
              <p className="rate">{item.rating}</p>
            </div>
          </div>
        </div>
        <h1 className="Descriptionheading">Description</h1>
        <p className="paradescp">{item.jobDescription}</p>
        <div className="salandlocation">
          <div className="rating">
            <MdLocationOn className="location" />
            <p className="address">{item.location}</p>
            <AiOutlineMail className="location" />
            <p className="address">{item.employmentType}</p>
          </div>
        </div>
      </li>
    )
  }
}
export default SimilarJob
