import React from "react";
import Player from "./player";
import { useGetAllUsers } from "./getAllUsers";

function Players() {
    const {users, error} = useGetAllUsers();

    if (error) return <p>{error}</p>
    return(
        <>
        {users.map(user =>(
            <Player key={user.id} user={user}/>
            ))}
        </>
    )


}

export default Players