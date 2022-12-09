import axios from "axios";
const APT_URL = "http://localhost:8080/api/user";

class AuthService {
    login(email, password) {
        return axios.post(APT_URL + "/login", { email, password });
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(name, email, password) {
        return axios.post(APT_URL + "/register", {
            name,
            email,
            password,
        });
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();