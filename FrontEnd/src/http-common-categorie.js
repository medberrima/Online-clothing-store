import axios from "axios";
// console.log(localStorage.getItem('token'))

const token =  "Bearer "+localStorage.getItem('token');

export default axios.create({
  baseURL: "http://localhost:8080/vetements/cat",
  credentials: 'include',
  headers: {
    "Content-type": "application/json",
    "Authorization": token
  }
});