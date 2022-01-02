import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import './Login.css';
// axios.interceptors.request.use((request)=>{

//   if(localStorage.getItem("token")){
//     request.headers.authorization=`Bearer ${localStorage.getItem('token')}`;
//   }
//   return request;
// })

// axios.interceptors.response.use((response)=>{
//   let token = localStorage.getItem("token");
//   if(token){
//     (response.data=='' &&(response.data = {}))
//     response.data.user = jwt_decode(token+"");
//   }
//   console.log(token)
//   return response;
// })


const Login = () => {
  const history = useHistory();

  let username = "";
  let password = "";

  const loginUser = (e) => {
    e.preventDefault();
    let user = { username, password }

    axios.post(
      "http://localhost:8081/users/login",
      user,
      { mode: 'no-cors' }
    ).then((res) => {
      localStorage.setItem("token", res.headers.authorization)
      history.push("/vetements");
    })

  }

  return (
    <div className="login-user">
      <div className="row">
        <div className="col-6 img-login ">  </div>
        <div className="col-6 login-form">
          <div className="py-4 m-5 ">
            <h1>Login Page</h1>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input
                  type="text"
                  onChange={(e) => { username = e.target.value }}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  onChange={(e) => password = e.target.value}
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="form-group form-check">


              </div>
              <button onClick={loginUser} className="btn btn-primary login-btn"style={{ fontSize: 20 }}>   Login     </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
