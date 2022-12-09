import React from 'react'

const LoginComponent = () => {
  return (
    <div className="card signup_form_border" style={{borderRadius: 15}}>
        <div className="card-body p-5">
            <h2 className="text-uppercase text-center mb-5 form_text">Login</h2>
            <form className="signup_form">

                <div className="form-outline mb-4">
                    <input type="email" id="form3Example3cg" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" id="form3Example4cg" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="form3Example4cg">Password</label>
                </div>

                <div className="d-flex justify-content-center">
                    <button type="button"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 button_color">Login</button>
                </div>

            </form>
        </div>
    </div>
  )
}

export default LoginComponent