import React, { useState } from 'react'

const BodyExample = ()=>{
    const [count, setCount] = useState(0);

    const [name,setName]=useState("Dinesh Kumar");

    return (
      <div>
        <p> {name} You clicked {count} times</p>
          
         

        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
};

export default BodyExample;