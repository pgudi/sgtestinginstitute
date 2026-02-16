import axios from "axios";

const BASE_USER_API_URL = "http://localhost:9090/api/v1";
class UserServices{
   
    registerUser(user){
        return axios.post(BASE_USER_API_URL + "/register", user);   
    }
}

export default new UserServices();