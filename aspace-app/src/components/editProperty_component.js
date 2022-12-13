import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PropertyService from "../services/property.service";
import axios from "axios";

const EditPropertyComponent = (props) => {
    let { currentUser, setCurrentUser } = props;

    const { id } = useParams();
    const [property, setProperty] = useState({
        title: "",
        type: "",
        price: 0,
        image: "",
        city: "",
        state: "",
        address: "",
        postalCode: 0,
        description: "",
        amenities: "",
    });

    const {
        title,
        type,
        price,
        image,
        city,
        state,
        address,
        postalCode,
        description,
        amenities,
    } = property;

    const onInputChange = (e) => {
        setProperty({ ...property, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadProperty(id);
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/api/properties/${id}`, property, {headers: {
            Authorization: currentUser.token,
          }});
        navigate("/property");
    };

    const loadProperty = async (id) => {
        PropertyService.getOne(id)
        .then((data) => {
            console.log(data);
            setProperty(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
        // const result = await axios.get(`http://localhost:8080/api/properties/${id}`);
        // setProperty(result.data);
    };

    let [message, setMessage] = useState("");

    const navigate = useNavigate();
    const handleTakeToLogin = () => {
        navigate("/login");
    };

    return (
        <div style={{ padding: "3rem" }}>
            {!currentUser && (
                <div>
                    <p>You must login first before edit a property.</p>
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={handleTakeToLogin}
                    >
                        Take me to login page.
                    </button>
                </div>
            )}
            {currentUser && currentUser.user.role !== "host" && (
                <div>
                    <p>Only the host can edit properties.</p>
                </div>
            )}
            {currentUser && currentUser.user.role == "host" && (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                            <h2 className="text-center m-4">Edit Your Property</h2>
                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className="mb-3">
                                    <label for="titleOfPost">Title</label>
                                    <input
                                        name="title"
                                        type="text"
                                        className="form-control"
                                        id="titleOfPost"
                                        value={title}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="typeOfPost">Type</label>
                                    <input
                                        name="type"
                                        type="text"
                                        className="form-control"
                                        id="typeOfPost"
                                        value={type}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleforPrice">Price</label>
                                    <input
                                        name="price"
                                        type="number"
                                        className="form-control"
                                        id="exampleforPrice"
                                        value={price}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="cityOfPost">City</label>
                                    <input
                                        name="city"
                                        type="text"
                                        className="form-control"
                                        id="cityOfPost"
                                        value={city}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="stateOfPost">State</label>
                                    <input
                                        name="state"
                                        type="text"
                                        className="form-control"
                                        id="stateOfPost"
                                        value={state}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="addressOfPost">Address</label>
                                    <input
                                        name="address"
                                        type="text"
                                        className="form-control"
                                        id="addressOfPost"
                                        value={address}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="postalCodeOfPost">Zip Code</label>
                                    <input
                                        name="postalCode"
                                        type="text"
                                        className="form-control"
                                        id="postalCodeOfPost"
                                        value={postalCode}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="descriptionOfPost">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="descriptionOfPost"
                                        aria-describedby="emailHelp"
                                        name="description"
                                        value={description}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="amenitiesOfPost">Amenities</label>
                                    <textarea
                                        className="form-control"
                                        id="descriptionOfPost"
                                        aria-describedby="emailHelp"
                                        name="amenities"
                                        value={amenities}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                </div>
                                <div className="mb-3">
                                </div>
                                <button type="submit" className="btn btn-outline-primary">
                                    Submit
                                </button>

                            </form>
                            <br />
                            {message && (
                                <div className="alert alert-warning" role="alert">
                                    {message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditPropertyComponent;
