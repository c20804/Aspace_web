import React, { useState } from 'react'
import HeaderComponent from './components/header_component';
import ListComponent from './components/list_component';
import { Routes, Route } from "react-router-dom";
import HomeComponent from './components/home_component';
import FooterComponent from './components/footer_component';
import SignupComponent from './components/signup_component';
import LoginComponent from './components/login_component';
import ProfileComponent from './components/profile_component';
import PropertyComponent from './components/property_component';
import PostPropertyComponent from './components/postProperty_component';
import ReserveComponent from './components/reserve_component';
import AuthService from "./services/auth.service";

function App() {
  let [search, setSearch] = useState([]);
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <div className="App">
      <HeaderComponent search={search} setSearch={setSearch} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Routes>
        <Route path="/" element={<HomeComponent/>} />
        <Route path="/listing" element={<ListComponent search={search} setSearch={setSearch} currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
        <Route path="/register" element={<SignupComponent/>} />
        <Route path="/login" element={<LoginComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
        <Route path="/profile" element={<ProfileComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
        <Route path="/property" element={<PropertyComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
        <Route path="/postProperty" element={<PostPropertyComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
        <Route path="/reserve" element={<ReserveComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;