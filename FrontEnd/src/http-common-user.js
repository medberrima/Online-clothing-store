import axios from "axios";
const token =  "Bearer "+localStorage.getItem('token');

export default axios.create({
  baseURL: "http://localhost:8081/users",
  credentials: 'include',
  headers: {
    "Content-type": "application/json",
    "Authorization": token
  }
});