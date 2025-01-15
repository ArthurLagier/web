import React, { useState } from "react"


function Button(){
    const [count, setCount] = useState(0);
    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
      };
    return(<> 
     <button onClick={handleIncrement}>+</button>
     <h5>Le compte est {count}</h5>
    
   
    </>);
}




export default Button