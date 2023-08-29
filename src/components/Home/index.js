import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="HomeContainer">
          <h1 className="heading">
            Find The Job That <br /> Fits Your Life
          </h1>
          <p className="Discription">
            Millions of people are searching for Jobs,salary
            <br /> information ,company reviews.Find the job that fits <br />{' '}
            your abilities and potentioal.
          </p>
          <Link to="/jobs">
            <button type="button" className="findjobBurron">
              Find Jobs
            </button>
          </Link>
        </div>
      </>
    )
  }
}
export default Home
