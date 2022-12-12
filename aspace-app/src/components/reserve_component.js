import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import PropertyService from "../services/property.service";

const ReserveComponent = (props) => {
    let { currentUser, setCurrentUser } = props;
    const navigate = useNavigate();

    const handleTakeToLogin = () => {
        navigate("/login");
      };
    
    let [propertyData, setPropertyData] = useState(null);
    let [reservationData, setReservationData] = useState(null);

    useEffect(() => {
        console.log("Using effect.");
        let _id;
        if (currentUser) {
          _id = currentUser.user._id;
        } else {
          _id = "";
        }

        PropertyService.getReservation(_id)
        .then((data) => {
            console.log(data.data);
            setReservationData(data.data);
            // data.data.map((reservation) => {
                // console.log(reservation.propertyId)
                // PropertyService.getProperty(reservation.propertyId)
                // .then((property) => 
                // console.log(property.data[0]))
                // .catch((err)=>{console.log(err);})
            // });
            // setPropertyData(data.data);
        })
        .catch((err) => {
            console.log(err);
        });

      }, []);

return (
    <div style={{ padding: "3rem" }}>
        {!currentUser && (
                <div>
                <p>You must login before seeing your properties.</p>
                <button
                    onClick={handleTakeToLogin}
                    className="btn btn-primary btn-lg"
                >
                    Take me to login page
                </button>
                </div>
        )}

        {currentUser && currentUser.user.role === "guest" && (
                    <div>
                        <p>Here's your reservations.</p>
                        {reservationData.map((reservation) => (
                            // console.log(reservation.date)
                            <div> 
                                <h4>******</h4>
                                <h4>propertyId: {reservation.propertyId}</h4>
                                <h4>reservation date: {reservation.date.split("T")[0]}</h4>
                            </div>
                        ))}
                        {/* {propertyData.map((property) => (
                            <div className="card" style={{ width: "18rem" }}>
                                <div className="card-body">
                                <img src={`data:image/jepg;base64,${property.image}`} alt="property" width={"250rem"} height={"250rem"} />
                                    <h5 className="card-title">{property.title}</h5>
                                    <h3>{property.city}</h3>
                                    <p className="card-text">{property.description}</p>
                                    <p className="card-text">$ {property.price} per day</p>
                                    <Link to={`/editproperty/${property._id}`} className="btn btn-secondary">Edit</Link>
                                    <br />
                                </div>
                            </div>
                        ))} */}
                    </div>
                )}
        </div>
  );
}

export default ReserveComponent;