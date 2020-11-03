import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9092/jpa",
  headers: {
    "Content-type": "application/json"
  }
});