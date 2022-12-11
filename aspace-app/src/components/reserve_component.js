import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyService from "../services/property.service";

const ReserveComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);

  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    PropertyService.getCourseByName(searchInput)
      .then((data) => {
        console.log(data);
        setSearchResult(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleReserve = (e) => {
    ReserveService.enroll(e.target.id, currentUser.user._id)
      .then(() => {
        window.alert("Reserved Successfully!");
        navigate("/property");
      })
      .catch((err) => {
        console.log(err);
      });
  };

return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login first before searching for properties.</p>
          <button class="btn btn-primary btn-lg" onClick={handleTakeToLogin}>
            Redirecting to login page.
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "host" && (
        <div>
          <h1>Only guests can reserve a stay.</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === "guest" && (
        <div className="search input-group mb-3">
          <input
            onChange={handleChangeInput}
            type="text"
            class="form-control"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length != 0 && (
        <div>
          <p>Data we got back from API.</p>
          {searchResult.map((property) => (
            <div key={property._id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{property.title}</h5>
                <p className="card-text">{property.description}</p>
                <p>Price: {property.price}</p>
                <p>Has been reserved {property.guests.length} times!</p>
                <a
                  href="#"
                  onClick={handleReserve}
                  className="card-text btn btn-primary"
                  id={course._id}
                >
                  Reserve
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReserveComponent;