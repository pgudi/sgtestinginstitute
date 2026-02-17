import axios from "axios";

const BASE_USER_API_URL = "https://sgtestinginstitute.onrender.com/api/v1";
class UserServices{
   
    registerUser(user){
        return axios.post(BASE_USER_API_URL + "/register", user);   
    }
}

export default new UserServices();