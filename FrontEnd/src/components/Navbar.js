import React from "react";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from 'react';
const Navbar = () => {
  let [isAdmin, setIsAdmin] = useState(false)
  let [isUser, setIsUser] = useState(false)
  const history = useHistory();
  let [user, setUser] = useState(null)

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token != null)  setUser(jwt_decode(token + "").sub);
    else history.push("/login");
  }, [])

  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log(token)
    if (token) {
      let user = jwt_decode(token );
      if (user.roles.includes("ADMIN"))     setIsAdmin(true);
      else if (user.roles.includes("USER")) setIsUser(true);
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("token");
    setIsUser(false);
    setIsAdmin(false);
    history.push("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5 fixed-top">
      <a style={{ fontSize: 30 }} className="navbar-brand text-light font-weight-bold display-4" href="/vetements">FASH<span className="text-primary">ION</span>.TN</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-link active" aria-current="page" to={"/vetements"}>Home</Link>
          {isAdmin && <Link className="nav-link " to={"/add"}>Add Vetement </Link>}
          {/* <Link className="nav-link" to={"/"}>Pricing</Link> */}
        </div>
        <div className="navbar-nav">
          {isAdmin && <div className="nav-link btn-primary  text-light" style={{cursor:"pointer"}} onClick={logout}>Logout {user}(admin)  </div>}
          {isUser && <div className="nav-link btn-primary text-light" style={{cursor:"pointer"}} onClick={logout}>Logout {user} </div>}
        </div>
        
      </div>
    </nav>
  )
}

export default Navbar;