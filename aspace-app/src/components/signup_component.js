import React, { useState } from 'react';
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const SignupComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
//   let [host, setIsHost] = useState("");
  let [message, setMessage] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };
//   const handleChnageRole = (e) => {
//     setRole(e.target.value);
//   };
  const handleRegister = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert(
          "Registration succeeds. You are now redirected to the login page."
        );
        navigate('/login');
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div className="card signup_form_border" style={{borderRadius: 15}}>
        <div className="card-body p-5">
            <h2 className="text-uppercase text-center mb-4 form_text">Create an account</h2>
            <form className="signup_form">
              {message && <div className="alert alert-danger">{message}</div>}
                <div className="form-outline mb-3">
                    <input 
                        onChange={handleChangeUsername}
                        type="text" 
                        id="form3Example1cg" 
                        className="form-control form-control-lg"
                        name="name" 
                    />
                    <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                </div>

                <div className="form-outline mb-3">
                    <input 
                        onChange={handleChangeEmail}
                        type="email" 
                        id="form3Example3cg" 
                        className="form-control form-control-lg"
                        name="email"
                    />
                    <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                </div>

                <div className="form-outline mb-3">
                    <input 
                        onChange={handleChangePassword}
                        type="password" 
                        id="form3Example4cg" 
                        className="form-control form-control-lg"
                        name="password" 
                    />
                    <label className="form-label" htmlFor="form3Example4cg">Password</label>
                </div>


                <div className="form-outline mb-3">
                    <input 
                    onChange={handleChangeRole} 
                    type="text" 
                    id="form3Example4cdg" 
                    className="form-control form-control-lg"
                    name="role" 
                    />
                    <label className="form-label" htmlFor="form3Example4cdg">Role</label>
                </div>

                <div className="form-check d-flex justify-content-center mb-4">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                    <label className="form-check-label" htmlFor="form2Example3g">
                        I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                    </label>
                </div>

                <div className="d-flex justify-content-center">
                    <button 
                        onClick={handleRegister}
                        type="button"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 button_color">
                        Register
                    </button>
                </div>

                <p className="text-center text-muted mt-4 mb-0">Have already an account? <a href="/login"
                    className="fw-bold text-body"><u>Login here</u></a></p>
            </form>
        </div>
    </div>
  )
}

export default SignupComponent