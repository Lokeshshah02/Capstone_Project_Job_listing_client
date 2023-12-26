import React from 'react'
import "./jobListing.scss"
import logo from "../../../assests/logo.png"
import group from"../../../assests/Group.png"
import Vector from "../../../assests/rs.png"
import flag from "../../../assests/flag.png"

const Joblist = () => {
  return (
    <>
      <div className='joblist'>
        <div className='logo'>
            <img src={logo} alt=''/>
        </div>
        <div className='content'>
            <div className='left'>
                <div className='left-one'>
                    <p>Frontend Developer</p>
                </div>
                <div className='left-two'>
                    <p><img src={group} id="group" alt=''/>11-50</p>
                    <p><img src={Vector} id="vector" alt=''/>50,000</p>
                    <p><img src={flag} id="flag" alt=''/>Delhi</p>
                </div>
                <div className='left-three'>
                    <p>Office</p>
                    <p>Full time</p>
                </div>
               
            </div>
            <div className='right'>
                <div className='skills'>
                    <p>Frontend</p>
                    <p>css</p>
                    <p>Javascript</p>
                    <p>HTML</p>
                </div>
                <div className='buttons'>
                    <button type='button'>Edit job</button>
                    <button type='button'>View Details</button>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Joblist