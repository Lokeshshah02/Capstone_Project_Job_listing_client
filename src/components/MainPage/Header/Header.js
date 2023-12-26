import React from 'react'
import rectangle1 from "../../../assests/rect1.png"
import rectangle2 from "../../../assests/rect2.png"
import rectangle3 from "../../../assests/rect3.png"
import profile from "../../../assests/imageProfile.png"
import "./header.scss"
export const Header = () => {
  return (
    <>
      <div className='header'>
            <div className='rectangles'>
                <p ><img src={rectangle1} id="rect1" alt=''/></p>
                <p ><img src={rectangle2} id="rect2" alt=''/></p>
                <p><img src={rectangle3} id="rect3" alt=''/></p>
            </div>
            <div className='menu'>
                <div className='menu-heading'>
                <h1>Jobfinder</h1>
                </div>
                <div className='buttons'>
                <button id="login">Login</button>
                <button id='register'>Register</button>
                </div>
                {/* <div className='buttons2'>
                <button id='logout'>Logout</button>
                <p>Hello! Recruiter </p>
                <img src={profile} alt=''/>
                </div> */}
            </div>
        </div>
    </>
  )
}
