import React from "react";
import { useGetAllUsers } from "./getAllUsers";
import User from "./player";

function Users() {
    const {users, error} = useGetAllUsers();

    if (error) return <p>{error}</p>
    return(
        <>
        {users.map(user =>(
            <User key={user.id} user={user}/>
            ))}
        </>
    )


}

export default Users