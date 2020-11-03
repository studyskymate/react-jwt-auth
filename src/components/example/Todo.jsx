import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const axios = require("axios").default;

const Todo = () => {
  const APIURL = "http://127.0.0.1:9092/jpa";

  let id = "id";

  const todoobj = {
    id: 11005,
    username: "dinesh",
    description: "Learn Spring Boot ",
    targetDate: "2020-10-05T10:03:31.432+0000",
    done: false,
  };
  const todoPage = {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 10,
    "sortField": "description",
    "sortDirection": "desc",
    "recordPerPage": 10,
    "todosList": [todoobj]
  }

  const [todoP, setTodoP] = useState(todoPage);

  const [todos, setTodos] = useState([todoobj]);

  const [direction, setDirection] = useState();
  const [sortField, setSortField] = useState("id");




  useEffect(() => {
    fetchTodos();
  }, []); // << super important array


  const fetchTodos = () => {
    // let direction = todoP.direction;
    //console.log("Hello 2"+todoP.sortField);

    //  let sortField = todoP.sortField;
    let recordPerPage = todoP.recordPerPage;
    let currentPageNo = todoP.currentPage;
    /*
        "currentPage": 4,
        "totalPages": 5,
        "totalItems": 10,
        "sortField": "description",
        "sortDirection": "desc",
        "recordPerPage": 2,
    */

    fetch(
      `${APIURL}/users/dinesh/todos/v2/${currentPageNo}/${recordPerPage}?sortField=${sortField}&sortDirection=${direction}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTodoP(data)
        setTodos(data.todosList);
        // setDirection(data.sortDirection);
        console.log(data.sortDirection + " " + direction);
        console.log(todoP);
      });

    console.log("fetched");
  }



  const fetchDataSorted = (event) => {
    event.preventDefault();

    let name = event.target.getAttribute('name')
    let value = event.target.getAttribute('value')

    setSortField(value);

    setTodoP((preValue) => {
      console.log(preValue);
      return {
        ...preValue, //Spread Operator 
        [name]: value,
      };
    }
    )

    console.log("Hello" + todoP.sortField);
    //  setDirection((direction=="desc"?"asc":"desc"));
    fetchTodos();
  }


  const handleEdit = (event) => {
    let id = event.target.value;
    console.log("value:" + id);

  }



  const handleDelete = (event) => {
    deleteAPI(event);
    fetchTodos();
  }



  const deleteAPI = (event) => {
    let id = event.target.value;

    let username = "dinesh"
    let URI = `${APIURL}/users/${username}/todos/${id}`;
    console.log(URI);
    axios.delete(URI)
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })

  }



  return (
    <>
      <div class="container">
        <h2>Todos</h2>
        <p>
          My Todos List
        </p>
        <table class="table">
          <thead>
            <tr>
              <th onClick={fetchDataSorted} name="sortField" value="id">ID</th>
              <th onClick={fetchDataSorted} name="sortField" value="username">Username</th>
              <th onClick={fetchDataSorted} name="sortField" value="description">Description</th>
              <th onClick={fetchDataSorted} name="sortField" value="targetDate">Targetate</th>

<th >Is Done</th>
<th >Edit</th>
<th >Delete</th>

</tr>
</thead>

<tbody>
{todos.map((mytodo) => (
<tr>
  <td>{mytodo.id}</td>
  <td>{mytodo.username}</td>
  <td>{mytodo.description}</td>
  <td>{mytodo.targetDate}</td>
  <td>{mytodo.done}</td>
  <td><button type="button" className="btn btn-warning" value={mytodo.id} onClick={handleEdit}>Edit</button></td>
  <td><button type="button" className="btn btn-danger" value={mytodo.id} onClick={handleDelete}>Delete</button></td>
</tr>
))}
</tbody>

</table>
<hr />
<button type="button" className="btn btn-warning" value="Add Todos"> <Link to="/AddTodos">Add Todos </Link></button>
</div>
</>
);
};

export default Todo;
