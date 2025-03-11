import React from "react";
import Pokemon from "./Pokemon";
import { useGetAllPokemon } from "./GetAllPokemon";

function Pokemons() {
    const {pokemon, error} = useGetAllPokemon();

    if (error) return <p>{error}</p>
    return(
        <>
        {pokemon.map(pokemon =>(
            <Pokemon key={pokemon.id} pokemon={pokemon}/>
            ))}
        </>
    )


}

export default Pokemons