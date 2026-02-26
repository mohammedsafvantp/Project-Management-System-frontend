import commonAPI from "./commonAPI";
import SERVER_URL from "./server_url";

export const registerAPI=async(reqBody)=>{
    
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

export const loginAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
 }

 export const addProjectAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
 }

 export const getallProjectAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/get-all-projects`,{},reqHeader)
 }

 export const getHomeProjectAPI=async()=>{
    return await commonAPI("GET",`${SERVER_URL}/get-home-projects`,{})
 }