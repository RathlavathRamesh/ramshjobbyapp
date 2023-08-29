import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobItem from '../jobItems'
import Checkbox from '../CheckBoxes'
import RadioButtons from '../RadioButtons'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
class Jobs extends Component {
  state = {
    isLoading: false,
    Isprofile: false,
    profilefail: false,
    jobsFail: false,
    profileData: {},
    jobsData: [],
    jobType: [],
    salaryRange: '',
    searchValue: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getjobs()
  }

  getSearchResult = event => {
    this.setState({searchValue: event.target.value})
  }

  getjobs = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const {jobType, salaryRange, searchValue} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${jobType}&minimum_package=${salaryRange}&search=${searchValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response2 = await fetch(apiUrl, options)
    if (response2.ok) {
      const data2 = await response2.json()
      const {jobs} = data2
      console.log(data2)
      const formattedJobs = jobs.map(each => ({
        id: each.id,
        title: each.title,
        rating: each.rating,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
      }))
      this.setState({isLoading: false, jobsData: formattedJobs})
    } else {
      this.setState({isLoading: false, jobsFail: true})
    }
  }

  getsalaryRange = event => {
    console.log(event.target.value)
    this.setState({salaryRange: event.target.value})
    this.getjobs()
  }

  getjobtype = event => {
    console.log(event.target.checked)
    this.setState({jobType: event.target.value})
    this.getjobs()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const item = data.profile_details
      const formatted = {
        profileImageUrl: item.profile_image_url,
        name: item.name,
        shortBio: item.short_bio,
      }
      this.setState({
        Isprofile: true,
        profilefail: false,
        profileData: formatted,
      })
    } else {
      this.setState({profilefail: true})
    }
  }

  render() {
    const {
      isLoading,
      Isprofile,
      profileData,
      profilefail,
      jobsData,
      jobsFail,
    } = this.state
    const isDataready = jobsData.length !== 0
    return (
      <>
        <Header />
        <div className="jobsContainer">
          {isLoading && (
            <div className="products-loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
            </div>
          )}
          <div className="jobsCard">
            <ul className="leftCard">
              {Isprofile && (
                <li className="profile">
                  <img
                    src={profileData.profileImageUrl}
                    alt="profile"
                    className="avatar"
                  />
                  <h1 className="profileName">{profileData.name}</h1>
                  <p className="bio">{profileData.shortBio}</p>
                </li>
              )}
              {profilefail && (
                <div className="btnConat">
                  <button
                    type="button"
                    onClick={this.getProfile}
                    className="logout-desktop-btn"
                  >
                    Retry
                  </button>
                </div>
              )}
              <hr className="line" />
              <h1 className="empheading">Type of Employment</h1>
              <ul>
                {employmentTypesList.map(each => (
                  <Checkbox
                    item={each}
                    key={each.employmentTypeId}
                    func={this.getjobtype}
                  />
                ))}
              </ul>
              <h1 className="empheading">Salary Range</h1>
              <ul className="radiobuttons" onChange={this.getsalaryRange}>
                {salaryRangesList.map(each => (
                  <RadioButtons item={each} key={each.salaryRangeId} />
                ))}
              </ul>
            </ul>

            <div className="jobs">
              <div className="searchIcon">
                <input
                  type="search"
                  className="search-input-filed"
                  placeholder="search"
                  onChange={this.getSearchResult}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="serchbtn"
                  onClick={this.getjobs}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {isDataready && (
                <ul>
                  {jobsData.map(each => (
                    <JobItem item={each} key={each.key} />
                  ))}
                </ul>
              )}
              {jobsFail && (
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
                    onClick={this.getjobs}
                    className="logout-desktop-btn"
                  >
                    Retry
                  </button>
                </div>
              )}
              {!isDataready && (
                <div className="nojobs">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
                    alt="no jobs"
                    className="notjobs"
                  />
                  <h1 className="empheading">No Jobs Found</h1>
                  <p className="rate">
                    We could not find any jobs. Try other filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
