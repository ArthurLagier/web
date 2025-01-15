
import React from "react"
import Users from "./Users"
import players from "./players"

function Home()
{
return(<>
  <h1>WELCOME</h1> <Users nom="Arthur" habitat="France"/>
  <>{players}</>
  </>)
}

export default Home
