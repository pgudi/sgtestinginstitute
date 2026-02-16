import axios from "axios";

const BASE_API_URL = "https://sgtestinginstitute.onrender.com";
const TOKEN_KEY = "token";

class AuthService {

  async login(username, password) {
    const response = await axios.post(
      `${BASE_API_URL}/authenticate`,
      { username, password },{
        responseType: "text"
      }
     
    );

    console.log("FULL LOGIN RESPONSE:", response);
    console.log("LOGIN RESPONSE DATA:", response.data);

    if (response.data) {
      localStorage.setItem(TOKEN_KEY, response.data);
      console.log("TOKEN SAVED:", response.data);
    } else {
      console.log("TOKEN NOT FOUND IN RESPONSE");
    }

    return response.data;
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    console.log("TOKEN HAS REMOVED!!");
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}

export default new AuthService();