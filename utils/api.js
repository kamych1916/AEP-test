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
    client = {
        async getClientInfo(PageRole) {
            let UserRole = localStorage.getItem('role')
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/getClientInfo`,
                {UserRole, idecur, PageRole}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },
        async sendNewUserData(UserData) {
            return axios.post(
                `${contsants.API_BASE_URL}/newUserData`,
                {UserData}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },  
    }

    requests = {
        async getRequests(PageRole) {
            let UserRole = localStorage.getItem('role')
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/getRequests`,
                {UserRole, idecur, PageRole}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },
        async getDataRequest(PageRole, RequestId) {
            let UserRole = localStorage.getItem('role')
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/getDataRequest`,
                {UserRole, idecur, PageRole, RequestId}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },
    }

    objects = {
        async getObjects(PageRole) {
            let UserRole = localStorage.getItem('role')
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/getObjects`,
                {UserRole, idecur, PageRole}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },
        async getDataObject(PageRole, ObjectId) {
            let UserRole = localStorage.getItem('role')
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/getDataObject`,
                {UserRole, idecur, PageRole, ObjectId}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },
        async createDataObject(ObjectData) {
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/createDataObject`,
                {ObjectData, idecur}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },  
        async sendChangeObjectData(ObjectData) {
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/changeObjectData`,
                {ObjectData, idecur}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },
        async deleteObject(ObjectId) {
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/deleteObject`,
                {ObjectId, idecur}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },        
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
        // async check_user_role(){
        //     let UserRole = localStorage.getItem('role')
        //     let idecur = localStorage.getItem('idecur');
        //     return axios.post(`${contsants.API_BASE_URL}/auth/check_user_role`, {UserRole, idecur})
        // },
        async test() {    
            let idecur = localStorage.getItem('idecur');
            return axios.post(`${contsants.API_BASE_URL}/test`, {idecur}, 
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
