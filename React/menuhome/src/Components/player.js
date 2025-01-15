import React from "react";


function User ({user}){
    console.log("User", user)

    return(
        <>
        <h1>{user.name}</h1>



        <img src={user.avatar} alt={user.name}></img>
        </>
    )
}
export default User