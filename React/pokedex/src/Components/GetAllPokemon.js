import { useState, useEffect } from "react";
import { api } from "../Api/config";

export function useGetAllPokemon() {
    const [pokemon , setUsers] =useState([]);
    const [error , setError]= useState(null);

    const fetchPokemons = async () =>{
        try{

            const response= await api.get('/pokemon/?limit=100');
            setUsers(response.data);
            console.log("data Pokemons :", response.data);
        } catch (error) {
            setError("error API");
        }




    };
    useEffect(()=> {fetchPokemons()}, []);

    return {pokemon,error};
}