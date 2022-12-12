import React, { useState } from "react";
import DatePicker from "react-datepicker";
import PropertyService from "../services/property.service";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

const PostReservationComponent = (props) => {
    const {state} = useLocation();
    const propertyId = state.id;
    let { currentUser, setCurrentUser } = props;
    const [startDate, setStartDate] = useState(new Date());

    let [date, setDate] = useState("");
    let [guestNumber, setGuestNumber] = useState("");
    let [message, setMessage] = useState("");

    const navigate = useNavigate();
    
    const handleChangeGuestNumber = (e) => {
        setGuestNumber(e.target.value);
    };

    const postReservation = (e) => {
        PropertyService.addReservation(
          propertyId,
          currentUser.user._id,
          startDate,
          guestNumber,
        )
          .then(() => {
            window.alert("New reservation has been created.");
            navigate("/reservation");
          })
          .catch((error) => {
            console.log(error.response);
            setMessage(error.response.data);
            window.alert(message);
          });
      };

    return (
        <div className="form-group">
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <input
              name="guestNumber"
              type="text"
              className="form-control"
              id="guestNumber"
              onChange={handleChangeGuestNumber}
            />
            <button className="btn btn-secondary" onClick={postReservation}>
              Submit
            </button>
        </div>
    );
}

export default PostReservationComponent