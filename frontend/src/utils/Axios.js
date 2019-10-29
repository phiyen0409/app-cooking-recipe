import axios from 'axios';

class Axios{
    constructor(){
        axios.defaults.baseURL = 'https://localhost:3000';
    }
    restfulApi = () => {
        return axios;
    }
}

export default Axios;