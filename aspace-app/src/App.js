import React, { useState } from 'react'
import HeaderComponent from './components/header_component';
import ListComponent from './components/list_component';
import { Routes, Route } from "react-router-dom";
import HomeComponent from './components/home_component';
import FooterComponent from './components/footer_component';
import SignupComponent from './components/signup_component';
import LoginComponent from './components/login_component';

function App() {
  let [search, setSearch] = useState([]);

  return (
    <div className="App">
      <HeaderComponent search={search} setSearch={setSearch}/>
      <Routes>
        <Route path="/" element={<HomeComponent/>} />
        <Route path="/listing" element={<ListComponent search={search} setSearch={setSearch}/>} />
        <Route path="/api/user/register" element={<SignupComponent/>} />
        <Route path="/login" element={<LoginComponent/>} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
