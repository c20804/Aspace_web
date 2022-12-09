import React from 'react'
import SignupComponent from './signup_component'

const HomeP3Component = () => {
  return (
    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                    <SignupComponent />
                </div>
                <div className="col item-md-invisible">
                    <h1 className="title_p3"> Sign Up</h1>
                    <h2 className="content_p3 item-md-invisible"> Can't wait for <br></br> you  to  join us</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeP3Component