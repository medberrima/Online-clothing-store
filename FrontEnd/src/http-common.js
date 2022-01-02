import axios from "axios";
const token =  "Bearer "+localStorage.getItem('token');

export default axios.create({
  baseURL: "http://localhost:8080/vetements/api",
  credentials: 'include',
  headers: {
    "Content-type": "application/json",
    "Authorization": token
  }
});