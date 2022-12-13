import axios from "axios";
const API_URL = "http://localhost:8080/api/properties";

class PropertyService {
  // // try to get all
  getAll() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/listing", {
      headers: {
        Authorization: token,
      },
    });
  }
    
    //post new property
    post(title,
        type,
        price,
        image,
        city,
        state,
        address,
        postalCode,
        description,
        amenities) {
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }
    
        return axios.post(
          API_URL,
          { title,
            type,
            price,
            image,
            city,
            state,
            address,
            postalCode,
            description,
            amenities },
          {
            headers: {
              Authorization: token,
            },
          }
        );
      }

      // try to load edit page
      getOne(id){
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }
        return axios.get(API_URL + "/" + id, {
          headers: {
            Authorization: token,
          },
        });
      }
   // get favorites , userID
      getFavorites(_id) {
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }
    
        return axios.get(API_URL + "/guest/" + _id, {
          headers: {
            Authorization: token,
          },
        });
      }
// just try bad request!!!!!!!
      removeFav(_id, user_id){
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
      }

        return axios.patch(
          API_URL + "/property/" + _id,
          { user_id },
          {
            headers: {
              Authorization: token,
            },
          }
        );
      }

      // await axios.delete(API_URL + "/property/" + _id +`/{addFavBy}/${user_id}`)

      addFav(_id, user_id){
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }
    
        return axios.post(
          API_URL + "/property/" + _id,
          { user_id },
          {
            headers: {
              Authorization: token,
            },
      }
        );
      }

      //get properties from specific host
      get(_id) {
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }
        return axios.get(API_URL + "/host/" + _id, {
          headers: {
            Authorization: token,
          },
        });
      }

      // editProperty(id){

      // }

      // reserve
      addReservation(_id, user_id, date, guestNumber){
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }
    
        return axios.post(
          API_URL + "/reservation/" + _id + "/" + user_id,
          { date,
            guestNumber },
          {
            headers: {
              Authorization: token,
            },
      }
        );
      }

      // get reserve
      getReservation(user_id) {
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }
        return axios.get(API_URL + "/reservation/" + user_id, {
          headers: {
            Authorization: token,
          },
        });
      }

      // delete reservation
      deleteReservation(_id) {
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }
        return axios.delete(API_URL + "/reservation/" + _id, {
          headers: {
            Authorization: token,
          },
        });
      }

      // get property
      getProperty(_id) {
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }
        return axios.get(API_URL + "/property/" + _id, {
          headers: {
            Authorization: token,
          },
        });
      }

      // delete property
      deleteProperty(_id) {
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }
        return axios.delete(API_URL + "/" + _id, {
          headers: {
            Authorization: token,
          },
        });
      }




}

export default new PropertyService();
