import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = (props) => {
    const navigate = useNavigate();

    let { currentUser, setCurrentUser } = props;
    
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [message, setMessage] = useState("");
    const handleChangeEmail = (e) => {
      setEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
      setPassword(e.target.value);
    };
    const handleLogin = () => {
      AuthService.login(email, password)
        .then((response) => {
          console.log(response.data);
          if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          window.alert(
            "Login successfully, you are now redirected to the profile page."
          );
          setCurrentUser(AuthService.getCurrentUser());
          navigate('/profile');
        })
        .catch((error) => {
          console.log(error.response);
          setMessage(error.response.data);
        });
    };
    return (
        <div className="card signup_form_border" style={{borderRadius: 15}}>
            <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5 form_text">Login</h2>
                <form className="signup_form">
                    {message && (
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    )}
                    <div className="form-outline mb-4">
                        <input
                            onChange={handleChangeEmail}
                            type="text"
                            name="email" 
                            id="form3Example3cg" 
                            className="form-control form-control-lg" 
                        />
                        <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input
                            onChange={handleChangePassword}
                            type="password"
                            name="password" 
                            id="form3Example4cg" 
                            className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example4cg">Password</label>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button onClick={handleLogin} type="button"
                            className="btn btn-success btn-block btn-lg gradient-custom-4 button_color">Login</button>
                    </div>

                </form>
            </div>
        </div>
  )
}

export default LoginComponent