import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyService from "../services/property.service";

const PostPropertyComponent = (props) => {
    let { currentUser, setCurrentUser } = props;

    let [title, setTitle] = useState("");
    let [type, setType] = useState("");
    let [price, setPrice] = useState(0);
    let [image, setImage] = useState("");
    let [city, setCity] = useState("");
    let [state, setState] = useState("");
    let [address, setAddress] = useState("");
    let [postalCode, setPostalCode] = useState(0);
    let [description, setDescription] = useState("");
    let [amenities, setAmenities] = useState("");
    
    let [message, setMessage] = useState("");
    
    const navigate = useNavigate();
    const handleTakeToLogin = () => {
        navigate("/login");
    };
    const handleChangeTitle = (e) => {
      setTitle(e.target.value);
    };
    const handleChangeType = (e) => {
        setType(e.target.value);
    };
    const handleChangePrice = (e) => {
        setPrice(e.target.value);
    };
    const handleChangeImage = (e) => {
        setImage(e.target.value);
      };
    const handleChangeCity = (e) => {
        setCity(e.target.value);
    };
    const handleChangeState = (e) => {
      setState(e.target.value);
  };
    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
      };
    const handleChangePostalCode = (e) => {
        setPostalCode(e.target.value);
    };
    const handleChangeDesciption = (e) => {
        setDescription(e.target.value);
    };
    const handleChangeAmenities = (e) => {
        setAmenities(e.target.value);
    };


    const postProperty = () => {
      PropertyService.post(
        title,
        type,
        price,
        image,
        city,
        state,
        address,
        postalCode,
        description,
        amenities)
        .then(() => {
          window.alert("New property has been created.");
          navigate("/property");
        })
        .catch((error) => {
          console.log(error.response);
          setMessage(error.response.data);
        });
    };
  
    return (
      <div style={{ padding: "3rem" }}>
        {!currentUser && (
          <div>
            <p>You must login first before posting a new property.</p>
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
            <p>Only instrcutors can post new properties.</p>
          </div>
        )}
        {currentUser && currentUser.user.role == "host" && (
          <div className="form-group">
            <label for="titleOfPost">Title</label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="titleOfPost"
              onChange={handleChangeTitle}
            />
            <br />
            <label for="typeOfPost">Type</label>
            <input
              name="type"
              type="text"
              className="form-control"
              id="typeOfPost"
              onChange={handleChangeType}
            />
            <br />
            <label for="exampleforPrice">Price</label>
            <input
              name="price"
              type="number"
              className="form-control"
              id="exampleforPrice"
              onChange={handleChangePrice}
            />
            <br />
            <label for="imageOfPost">Image</label>
            <input
              name="image"
              type="text"
              className="form-control"
              id="imageOfPost"
              onChange={handleChangeImage}
            />
            <br />
            <label for="cityOfPost">City</label>
            <input
              name="city"
              type="text"
              className="form-control"
              id="cityOfPost"
              onChange={handleChangeCity}
            />
            <br />
            <label for="stateOfPost">State</label>
            <input
              name="state"
              type="text"
              className="form-control"
              id="stateOfPost"
              onChange={handleChangeState}
            />
            <br />
            <label for="addressOfPost">Address</label>
            <input
              name="address"
              type="text"
              className="form-control"
              id="addressOfPost"
              onChange={handleChangeAddress}
            />
            <br />
            <label for="postalCodeOfPost">Zip Code</label>
            <input
              name="postalCode"
              type="text"
              className="form-control"
              id="postalCodeOfPost"
              onChange={handleChangePostalCode}
            />
            <br />
            <label for="descriptionOfPost">Description</label>
            <textarea
              className="form-control"
              id="descriptionOfPost"
              aria-describedby="emailHelp"
              name="description"
              onChange={handleChangeDesciption}
            />
            <br />
            <label for="amenitiesOfPost">Amenities</label>
            <textarea
              className="form-control"
              id="descriptionOfPost"
              aria-describedby="emailHelp"
              name="amenities"
              onChange={handleChangeAmenities}
            />
            <br />

            <button className="btn btn-secondary" onClick={postProperty}>
              Submit
            </button>
            <br />
            <br />
            {message && (
              <div className="alert alert-warning" role="alert">
                {message}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default PostPropertyComponent;
  