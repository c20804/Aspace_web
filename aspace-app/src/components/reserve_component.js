import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import PropertyService from "../services/property.service";

const ReserveComponent = (props) => {
    let { currentUser, setCurrentUser } = props;
    const navigate = useNavigate();

    const handleTakeToLogin = () => {
        navigate("/login");
      };
    
    const onSubmit = async (e) => {
        // e.preventDefault();
        // await axios.put(`http://localhost:8080/api/properties/${id}`, property, {headers: {
        //     Authorization: currentUser.token,
        //   }});
        navigate("/listing");
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

    //delete
    const handleDelete = (e) => {
        
        PropertyService.deleteReservation(e.target.id, currentUser.user._id)
        .then(() => {
          window.alert("Delete Reservation!");
          window.location.reload();
        })
        .catch((err) => {
        //   window.alert("Delete Fail!");
          console.log(err);
        });
      };


return (
    <div style={{ padding: "3rem" }}>
        {!currentUser && (
                <div>
                <p>You must login before seeing your reservations.</p>
                <button
                    onClick={handleTakeToLogin}
                    className="btn btn-primary btn-lg"
                >
                    Take me to login page
                </button>
                </div>
        )}

        {currentUser && currentUser.user.role === "guest" && reservationData &&(
                    <div>
                        <h2>Here's your reservations.</h2>
                        <br/>
                        {reservationData.map((reservation) => (
                            // console.log(reservation.date)
                            <div> 
                                <div class="card-body">
                                    <h5 class="card-title">PropertyId: {reservation.propertyId}</h5>
                                    <p class="card-text">Reservation date: {reservation.date.split("T")[0]}</p>
                                    <form onSubmit={(e) => onSubmit(e)}>
                                    <input
                                        name="comment"
                                        type="text"
                                        className="form-control"
                                        id="typeOfPost"
                                        value="put your comment here..."
                                    />
                                    <p></p>
                                    <input
                                        name="rate"
                                        type="text"
                                        className="form-control"
                                        id="typeOfPost"
                                        value="rate here..."
                                    />
                                    <p></p>
                                    <button type="submit" className="btn btn-outline-primary">
                                    Submit comment and rating
                                    </button>
                                    <p></p>
                                    </form>
                                    <button onClick={handleDelete} id={reservation._id} class="btn btn-secondary">Cancellation</button>
                                </div>
                                <br />
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