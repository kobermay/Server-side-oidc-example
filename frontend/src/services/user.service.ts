import axios from "axios";

class UserService {
    userUrl = 'http://localhost:3001/auth/user';

    getUser(){
        return axios.get(this.userUrl);
    }
}
export default new UserService();