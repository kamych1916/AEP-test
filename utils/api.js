import axios from "axios";
import contsants from "./constants";

export default class Api {
    instance = null

    static getInstance() {
        if (Api.instance == null) {
            Api.instance = new Api; 
        }
        return Api.instance;
    }

    auth = {
        async login(email, password) {
            return axios.post(`${contsants.API_BASE_URL}/auth/login`, {email, password})
        },
        async registration(username, telephone, email, password) {
            return axios.post(`${contsants.API_BASE_URL}/auth/registration`, {username, telephone, email, password})
        },
        
        async remember(email) {    
            return axios.post(`${contsants.API_BASE_URL}/auth/remember`, {email})
        },
        
        async get_reset_code(code) {    
            return axios.post(`${contsants.API_BASE_URL}/auth/get_reset_code`, {code})
        },

        async reset(password, code, email) {    
            return axios.post(`${contsants.API_BASE_URL}/auth/reset`, {password, code, email})
        },

        async test() {    
            return axios.get(`${contsants.API_BASE_URL}/test`, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                    // headers: {
                    //     Authorization: `Bearer ksdfsdfsdfek`
                    // }
                })
        },
    }

}
