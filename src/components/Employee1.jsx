import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";


const Employee1 = () => {
  const APIURL = "http://127.0.0.1:9091/employee/fetch";

  const empployee = {
      id: 10013,
      name: "Dinesh",
      salary: 10000.0
  }

  const [emp, setEmp] = useState([empployee]);

  useEffect(() => {
      fetchEmployees();
  }, []); // << super important array

  const fetchEmployees = () => {

      fetch(
          `${APIURL}`
      ).then((response) => response.json())
      .then(
        (data) => setEmp(data)
        );

  }

  const deleteHandler =(event)=>{
    let id=event.target.value;

    alert(id+" : Deleted");
  }

  return (
    <div >
     
  <table className="table  table-dark">
      {emp.map((emp) => (
                <tr>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.salary}</td>
                    <td><button className="btn btn-warning" type="button">Edit</button></td>
                    <td><button onClick={deleteHandler} value ={emp.id} className="btn btn-danger" type="button">Delete</button></td>
                </tr>
            ))
            }
     </table>
    </div>
  );
};

export default Employee1;