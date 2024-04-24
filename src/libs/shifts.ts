import { axiosAuth } from "./axios";

const getShift = async ()=>{
try {
    const response = await axiosAuth.get('shift/');
    return response.data;
} catch (error: any) {
    return error.response.data
}
}

const createShift = async (id : string) =>{
    try {
        const response = await axiosAuth.post(`shift/${id}`);
        return response.data;
        
    } catch (error: any) {
        return error.response.data
        
    }
}


export {getShift, createShift};