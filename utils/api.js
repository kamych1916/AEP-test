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
        async getCLients(PageRole) {
            let UserRole = localStorage.getItem('role')
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/getClients`,
                {UserRole, idecur, PageRole}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },
        async getDataClientForAdmin(PageRole, ClientId) {
            let UserRole = localStorage.getItem('role')
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/getDataClientForAdmin`,
                {UserRole, idecur, PageRole, ClientId}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },
        async createNewClient(clientData) {
            let UserRole = localStorage.getItem('role')
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/createNewClient`,
                {UserRole, idecur, clientData}, 
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },
        
    }

    requests = {
        async getRequests(PageRole, ObjectId) {
            let UserRole = localStorage.getItem('role')
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/getRequests`,
                {UserRole, idecur, PageRole, ObjectId}, 
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
        async getRqstObjtsAndSrvs(PageRole) {
            let UserRole = localStorage.getItem('role')
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/getRqstObjtsAndSrvs`,
                {UserRole, idecur, PageRole}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },
        async createDataRequest(RequestData) {
            let UserRole = localStorage.getItem('role');
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/createDataRequest`,
                {RequestData, UserRole, idecur}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },
        async changeRequestData(RequestData) {
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/changeRequestData`,
                {RequestData, idecur}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },
        async deleteRequest(RequestId) {
            let UserRole = localStorage.getItem('role');
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/deleteRequest`,
                {RequestId, UserRole, idecur}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },
        async uploadFile(formData, RequestId) {
            return axios.post(
                `${contsants.API_BASE_URL}/uploadFile`,
                formData,
                {
                    params: {
                        RequestId
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
           )
        },
        async deleteFile(idImage, RequestId) {
            return axios.post(
                `${contsants.API_BASE_URL}/deleteFile`,
                {idImage, RequestId},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
           )
        },
        async getCLientsForCreateRequest(PageRole) {
            let UserRole = localStorage.getItem('role')
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/getCLientsForCreateRequest`,
                {UserRole, idecur, PageRole}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },
        async getClientData(PageRole, idClient) {
            let UserRole = localStorage.getItem('role')
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/getClientData`,
                {UserRole, idecur, PageRole, idClient}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },
    }

    objects = {
        async getCLientsForCreateObject(PageRole) {
            let UserRole = localStorage.getItem('role')
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/getCLientsForCreateObject`,
                {UserRole, idecur, PageRole}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },
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
        async changeObjectData(ObjectData) {
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

    contractor = {
        async getContractorData(PageRole) {
            let UserRole = localStorage.getItem('role')
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/getContractorData`,
                {idecur}, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('strjwt')}`
                    }                    
                }
            )
        },
        async changeContractorData(PageRole, ContractorData) {
            let UserRole = localStorage.getItem('role')
            let idecur = localStorage.getItem('idecur');
            return axios.post(
                `${contsants.API_BASE_URL}/changeContractorData`,
                {idecur, PageRole, UserRole, ContractorData}, 
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
        async registration(username, phone_number, email, password) {
            return axios.post(`${contsants.API_BASE_URL}/auth/registration`, {username, phone_number, email, password})
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
