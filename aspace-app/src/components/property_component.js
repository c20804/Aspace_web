import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyService from '../services/property.service';


const PropertyComponent = (props) => {
    let { currentUser, setCurrentUser } = props;
    const navigate = useNavigate();

    const handleTakeToLogin = () => {
        navigate("/login");
      };
    
    let [propertyData, setPropertyData] = useState(null);

    useEffect(() => {
        console.log("Using effect.");
        let _id;
        if (currentUser) {
          _id = currentUser.user._id;
        } else {
          _id = "";
        }

        if (currentUser.user.role === "host") {
          PropertyService.get(_id)
            .then((data) => {
              console.log(data);
              setPropertyData(data.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (currentUser.user.role === "guest") {
          PropertyService.getFavorites(_id)
            .then((data) => {
              console.log(data);
              setPropertyData(data.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
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
            {currentUser && currentUser.user.role === "host" && (
                <div>
                <h1>Welcome to host's properties page.</h1>
                </div>
            )}
            {currentUser && currentUser.user.role === "guest" && (
                <div>
                <h1>Your favorite properties.</h1>
                </div>
            )}
            {currentUser && propertyData && propertyData.length != 0 && (
                <div>
                    <p>Here's the data got back from server.</p>
                    {propertyData.map((property) => (
                        <div className="card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{property.title}</h5>
                                <h3>{property.city}</h3>
                                <p className="card-text">{property.description}</p>
                                <p className="card-text">$ {property.price} per day</p>
                                <button className="btn btn-primary">Edit</button>
                                <br />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PropertyComponent;