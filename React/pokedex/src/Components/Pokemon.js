import React from "react";


function Pokemon ({pokemon}){
    console.log("Pokemon", pokemon)

    return(
        <>
        <h1>{pokemon.name}</h1>
        
        </>
    )
}
//<img src={Pokemon.avatar} alt={Pokemon.name}></img>
export default Pokemon