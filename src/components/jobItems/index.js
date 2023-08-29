import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {AiOutlineMail} from 'react-icons/ai'

class JobItem extends Component {
  render() {
    const {item} = this.props
    const {
      companyLogoUrl,
      title,
      rating,
      packagePerAnnum,
      location,
      employmentType,
      jobDescription,
      id,
    } = item
    return (
      <Link to={`/jobs/${id}`}>
        <li className="jobItem">
          <div className="logoandRole">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="companylogo"
            />
            <div>
              <h1 className="empheading">{title}</h1>
              <div className="rating">
                <BsFillStarFill className="star" />
                <p className="rate">{rating}</p>
              </div>
            </div>
          </div>
          <div className="salandlocation">
            <div>
              <div className="rating">
                <MdLocationOn className="location" />
                <p className="address">{location}</p>
                <AiOutlineMail className="location" />
                <p className="address">{employmentType}</p>
              </div>
            </div>
            <p className="address">{packagePerAnnum}</p>
          </div>
          <hr className="lines" />
          <h1 className="Descriptionheading">Description</h1>
          <p className="paradescp">{jobDescription}</p>
        </li>
      </Link>
    )
  }
}
export default JobItem
