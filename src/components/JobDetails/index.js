import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill, BsBoxArrowUpRight} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {AiOutlineMail} from 'react-icons/ai'
import Header from '../Header'
import SimilarJob from '../SimilarJobItem'

class JobDetails extends Component {
  state = {JobData: [], isLoading: false}

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    this.setState({
      isLoading: true,
      sameJobs: [],
      jobDetFail: false,
      dataReady: false,
      jobData: {},
      skillsar: [],
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const similarJobs = data.similar_jobs
      const JobDetailsData = data.job_details
      const formatSkills = JobDetailsData.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      const formatedSimilarJobs = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
        id: each.id,
      }))
      const formatedJobData = {
        companyLogoUrl: JobDetailsData.company_logo_url,
        companyWebsiteUrl: JobDetailsData.company_website_url,
        employmentType: JobDetailsData.employment_type,
        jobDescription: JobDetailsData.job_description,
        lifeAtCompany: JobDetailsData.life_at_company,
        location: JobDetailsData.location,
        packagePerAnnum: JobDetailsData.package_per_annum,
        skills: JobDetailsData.skills,
        title: JobDetailsData.title,
        rating: JobDetailsData.rating,
      }
      console.log(formatedJobData)
      this.setState({
        isLoading: false,
        sameJobs: formatedSimilarJobs,
        dataReady: true,
        jobData: formatedJobData,
        skillsar: formatSkills,
      })
    } else {
      this.setState({isLoading: false, jobDetFail: true})
    }
  }

  render() {
    const {
      jobData,
      isLoading,
      dataReady,
      sameJobs,
      skillsar,
      jobDetFail,
    } = this.state
    console.log(sameJobs)
    return (
      <>
        <Header />
        <div className="jobDetailsContianer">
          {isLoading && (
            <div className="products-loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
            </div>
          )}
          {dataReady && (
            <div className="jobDetails">
              <div className="jobData">
                <div className="logoandRole">
                  <img
                    src={jobData.companyLogoUrl}
                    alt="job details company logo"
                    className="companylogo"
                  />
                  <div>
                    <h1 className="empheading">{jobData.title}</h1>
                    <div className="rating">
                      <BsFillStarFill className="star" />
                      <p className="rate">{jobData.rating}</p>
                    </div>
                  </div>
                </div>
                <div className="salandlocation">
                  <ul>
                    <li className="rating">
                      <MdLocationOn className="location" />
                      <p className="address">{jobData.location}</p>
                      <AiOutlineMail className="location" />
                      <p className="address">{jobData.employmentType}</p>
                    </li>
                  </ul>
                  <p className="address">{jobData.packagePerAnnum}</p>
                </div>
                <hr className="lines" />
                <div className="visitContainer">
                  <h1 className="Descriptionheading">Description</h1>
                  <a href={jobData.companyWebsiteUrl} className="paradescp">
                    Visit <BsBoxArrowUpRight />
                  </a>
                </div>
                <p className="paradescp">{jobData.jobDescription}</p>
                <h1 className="skills">Skills</h1>
                <ul className="skillsCard">
                  {skillsar.map(each => (
                    <li className="imageCard" key={each.name}>
                      <img
                        src={each.imageUrl}
                        alt={each.name}
                        className="skillImage"
                      />
                      <p className="skillname">{each.name}</p>
                    </li>
                  ))}
                </ul>

                <h1 className="skills">Life at Company</h1>
                <div className="companyCard">
                  <p className="paradescp">
                    {jobData.lifeAtCompany.description}
                  </p>
                  <img
                    src={jobData.lifeAtCompany.image_url}
                    alt="life at company"
                    className="companyImage"
                  />
                </div>
              </div>
              <div className="similarJobsCard">
                <h1 className="skills">Similar Jobs</h1>
                <ul className="similarItems">
                  {sameJobs.map(each => (
                    <SimilarJob item={each} key={each.id} />
                  ))}
                </ul>
              </div>
            </div>
          )}
          {jobDetFail && (
            <div className="jobFail">
              <img
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                alt="failure view"
                className="nojobs"
              />
              <h1 className="empheading">Oops! Something Went Wrong</h1>
              <p className="rate">
                We cannot seem to find the page you are looking for
              </p>
              <button
                type="button"
                onClick={this.getJobData}
                className="logout-desktop-btn"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </>
    )
  }
}
export default JobDetails
