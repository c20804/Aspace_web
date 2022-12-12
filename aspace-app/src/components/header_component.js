import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../styles/header.css";

const HeaderComponent = (props) => {
  const { search, setSearch, currentUser, setCurrentUser } = props
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    window.alert("Logout Successfully, you are redirecting to the homepage.");
    setCurrentUser(null);
    navigate("/");
  };

  let [inputLocation, setInputLocation] = useState("");
  let [inputTime, setInputTime] = useState("");
  let [inputType, setInputType] = useState("");
  let [inputGuestNumber, setInputGuestNumber] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setSearch({"location" : inputLocation , "time" : inputTime, "type" : inputType, "guestNumber" : inputGuestNumber});
    setInputLocation("");
    setInputTime("");
    setInputType("");
    setInputGuestNumber("");
    
    navigate('/listing');
  }

  const inputLocationHandler = (e) => {
    setInputLocation(e.target.value);
    console.log(e.target.value);
  }

  const inputTimeHandler = (e) => {
    setInputTime(e.target.value);
    console.log(e.target.value);
  }

  const inputTypeHandler = (e) => {
    setInputType(e.target.value);
    console.log(e.target.value);
  }

  const inputGuestNumberHandler = (e) => {
    setInputGuestNumber(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div>
        <header className="navbar navbar-expand-md navbar-expand-lg fixed-top border-bottom">
        <div className="container" >
          <a className="navbar-brand" href="/">
                <img src="ASpace-1.png" alt="" width="50" height="50"></img>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="form ms-lg-auto ms-md-auto my-2 searchform">
                <div className="row justify-content-md-center">
                    <div className="col-sm">
                        <div className="form mb-3 mt-3">
                            <input onChange={inputLocationHandler} value={inputLocation} type="text" className="form-control" id="where" placeholder="Where to? (Location)" name="where"></input>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="form mt-3 mb-3">
                            <input onChange={inputTimeHandler} value={inputTime} type="text" className="form-control" id="when" placeholder="When?" name="when"></input>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="form mt-3 mb-3">
                            <input onChange={inputTypeHandler} value={inputType} type="text" className="form-control" id="what" placeholder="What place? (Title)" name="what"></input>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="form mt-3 mb-3">
                            <input onChange={inputGuestNumberHandler} value={inputGuestNumber} className="form-control" id="num" name="num" placeholder="Guest number"></input>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="mt-3 mb-3">
                            <button type="submit" onClick={submitHandler}><img src="images/search.png" alt='search'></img></button>
                        </div>
                    </div>
                </div>
            </form>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <span className="nav-link active" aria-current="page">Hi! {currentUser && (currentUser.user.name)}</span>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    {!currentUser && (<li><a className="dropdown-item" href="/login">Log in</a></li>)}
                    {!currentUser && (<li><a className="dropdown-item" href="/register">Sign up</a></li>)}
                    {currentUser && (<li><a className="dropdown-item" href="/profile">Profile</a></li>)}
                    {currentUser && currentUser.user.role === 'host' && (<li><a className="dropdown-item" href="/property">Property</a></li>)}
                    {currentUser && currentUser.user.role === 'guest' && (<li><a className="dropdown-item" href="/property">Favorite</a></li>)}
                    {currentUser && currentUser.user.role === 'host' && (<li><a className="dropdown-item" href="/postProperty">Add Property</a></li>)}
                    {currentUser && currentUser.user.role === 'guest' && (<li><a className="dropdown-item" href="/reservation">Reservation</a></li>)}
                    {currentUser && (<li><a onClick={handleLogout} className="dropdown-item" href="/">Log out</a></li>)}
                  </ul>
                </li>
              </ul>
          </div>
        </div>
      </header>
    </div>
  )
}

export default HeaderComponent;