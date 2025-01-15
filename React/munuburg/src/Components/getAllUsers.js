import { useState, useEffect } from "react";
import { api } from "../Api/config";

export function useGetAllUsers() {
    const [users , setUsers] =useState([]);
    const [error , setError]= useState(null);

    const fetchUsers = async () =>{
        try{

            const response= await api.get('/Users');
            setUsers(response.data);
            console.log("data users :", response.data);
        } catch (error) {
            setError("error API");
        }




    };
    useEffect(()=> {fetchUsers()}, []);

    return {users,error};
}
export default useGetAllUsers