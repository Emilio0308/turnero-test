import { axiosAuth } from "./axios"

const getCompanies = async ()=>{

    try {
        const response = await axiosAuth.get(`admin/tenant`)
        return response.data
    } catch (error : any) {
        return error.response.data
        
    }
}


const createCompanyDb = async (formData: any)=>{
    try {
        const response = await axiosAuth.post(`admin/createdb`, formData)
        return response.data
    } catch (error: any) {
        return error.repsonse.data
        
    }
}

export {getCompanies, createCompanyDb}