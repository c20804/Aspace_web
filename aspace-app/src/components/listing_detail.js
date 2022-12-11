import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import PropertyService from '../services/property.service';

const Listing_detail = (props) => {
    let { key, properties, isClick, setClick, currentUser, setCurrentUser } = props;
    const navigate = useNavigate();
    const handleTakeToLogin = () => {
        navigate("/login");
      };
      
    const handleTakeToSignUp = () => {
        navigate("/register");
    };
    useEffect(() => {
        console.log("Using effect.");
        let _id;
        if (currentUser) {
          _id = currentUser.user._id;
        } else {
          _id = "";
        }
    }, []);
  return (
    <div className="col listing_det">
<div className="card listing_detail" >
    <div className="card-body">
        <button type="button" class="btn btn-light close-btn" onClick={() => { setClick({ click: false, id: properties.id }) }}><span class="material-symbols-outlined">
cancel
</span></button>
        
        <div className='cardhead'>
            <img src={properties.image} className="card-img-top"></img>
            <div className='rating'>
                <img src='./images/Star.png' className='star' alt='star' />
                <span>{properties.rating}</span>
            </div>
            <h5 className="card-title location">{properties.city}</h5>
        </div>
        <p className="card-text">{properties.title}<br />$<span
            className="price">{properties.price}</span> hour</p>
        
        <p>Amenities <br/><span className='amenities'>{properties.amenities}</span></p>
        <p>Description <br/><span className='description'>{properties.description}</span></p>
        {!currentUser && (
        <div>
          <h5>You must login before making a reservation</h5>
          <button class="btn btn-primary btn-lg" onClick={handleTakeToLogin}>
            Login
          </button>
        </div>
      )}
        {currentUser && currentUser.user.role === "host" && (
        <div>
          <h5>Sorry, only guests can make a reservation.</h5>
          <p>How about signing up a guest account ?</p>
          <button class="btn btn-primary btn-lg" onClick={handleTakeToSignUp}>
            Sign Up
          </button>
        </div>
      )}
        {currentUser && currentUser.user.role === "guest" && (<div className='action_btn'>                    
            <button type="button" class="btn btn-outline-success reserve" id={currentUser.user._id}>Reserve</button>
            <button type="button" class="btn btn-outline-danger save" id={currentUser.user._id}><span className="material-symbols-outlined heart">favorite</span></button>
        </div>)}

    </div>
</div>
</div>
  )
}

export default Listing_detail;

