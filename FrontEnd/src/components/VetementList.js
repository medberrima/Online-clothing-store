import React, { useState, useEffect } from 'react'
import { AiFillCalendar, AiFillStar, AiFillDollarCircle, AiOutlineSearch } from 'react-icons/ai'
import { GiClothes } from 'react-icons/gi'
import Home from './Home';
import { Link } from 'react-router-dom';
import VetementService from '../services/VetementService'
import CategorieService from '../services/CategorieService'
import './Vetement.css'
import Select from 'react-select';
import Navbar from './Navbar';
import {  useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";


const VetementList = () => {
  const [vetements, setVetement] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectValue, setSelectValue] = useState("all");
  const [inputValue, setInputValue] = useState("");
  let [isAdmin, setIsAdmin] = useState(false)
  let [isUser, setIsUser] = useState(false)
  const history = useHistory();
  let [user, setUser] = useState(null)

  useEffect(() => {
    getVetements();
    getCategories();
  }, []);

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

  const getCategories = async () => {
    CategorieService.getAll()
      .then((res) => { setCategories(res.data); })
      .catch(e => { console.log(e); });
  }

  const getVetements = async () => {
    VetementService.getAll()
      .then((res) => { setVetement(res.data); })
      .catch(e => { console.log(e); });
  }

  const deleteVetement = async (id) => {
    VetementService.remove(id)
      .then(() => { getVetements(); })
      .catch(e => { console.log(e); });
  }

  const goldIcon = { color: "gold", fontSize: "1.5em" }
  const whiteIcon = { color: "grey", fontSize: "1.5em" }
  const Icon = { fontSize: "1.2em" }


  const setStarts = (rank) => {
    const starts = []
    for (let i = 0; i < rank; i++) starts.push(<li className="list-inline-item m-0" key={i}><AiFillStar style={goldIcon} /> </li>)
    for (let j = rank; j < 5; j++) starts.push(<li className="list-inline-item m-0" key={j}><AiFillStar style={whiteIcon} /> </li>)
    starts.push()
    return starts
  }

  const handleDropdownChange = (e) => {setSelectValue(e.target.value);  }
  const inputChange = (e) => {setInputValue(e.target.value);  console.log(e.target.value); }

  const filterVet = vetements.filter((vetement) => {
    return ((parseInt(vetement.categorie.idCat) === parseInt(selectValue) )&&(vetement.nomVetement.toLowerCase().includes(inputValue.toLowerCase())) )
  })

  const filterInput = vetements.filter((vetement) => {
    return (vetement.nomVetement.toLowerCase().includes(inputValue.toLowerCase()) )
  })

  return (
    <div>
      <Home />
      <div className="container">
        <div className="row">
          <div className="col-3 recherche bg-light">
            <h1>FILTER</h1> 
            <div>
              <div class="form-group">
                <label for="formGroupExampleInput2">Recherche</label>
                <input type="search" id="form1" className="form-control my-3  form-control-lg" placeholder="Search" onChange={inputChange}/>
              </div>
            <div className="form-group">
              <label htmlFor="">Categorie</label>
              <select className='form-select form-select-lg ' value={selectValue} onChange={handleDropdownChange}>
                <option value="all">--all categories--</option>
                {
                  categories.map(categorie => {
                    return (
                      <option key={categorie.idCat}
                        value={categorie.idCat}
                        id={categorie.idCat}
                      >
                        {categorie.nomCat}
                      </option>
                    )
                  })
                }
              </select>
            </div>
                </div>
          </div>
          <div className="col-9 ">
            <div className="row ">
              {
                (selectValue === "all" )
                  ? filterInput
                    .map((vetement) => (
                      // <CardVet/>
                      <div className="col-lg-3 col-md-4 mb-4 mb-lg-0 vetement " key={vetement.idVetement} >
                        <div className="card rounded shadow-sm border-0 mb-5" style={{ height : "500px" }} >
                          <div className="card-body p-3">
                            <Link to={`/${vetement.idVetement}`} style={{ textDecoration: 'none', color: "black" }}>
                              <img style={{ height : "250px" }} className="card-img-top" src={vetement.imgVetement === null ? "img/image.png" : vetement.imgVetement} alt={vetement.imgVetement} />
                              <h5 style={{ textTransform : "uppercase",fontSize: '18px' }} className="pt-3">{isAdmin && vetement.idVetement}   {vetement.nomVetement} </h5>
                              <p>
                                <span ><GiClothes className="mx-2 " style={Icon} />{vetement.categorie.nomCat}</span>
                                <br /><span ><AiFillDollarCircle className="mx-2 " style={Icon} />{vetement.prixVetement ? vetement.prixVetement : '0'}  DT</span>
                                <br /><span ><AiFillCalendar className="mx-2 " style={Icon} />{String(vetement.dateCreation).substr(0, 10)}</span>
                              </p>
                              <ul className="list-inline small ">
                                {setStarts(vetement.rank)}
                                <span className="badge bg-secondary mx-1">{vetement.rank}.0</span>
                              </ul>
                            </Link>
                            {isAdmin &&
                            <span className=" text-center" style={{ fontSize: '10px' }}>
                              <button style={{ fontSize: '12px' }} className="btn btn-danger mx-3" onClick={() => deleteVetement(vetement.idVetement)}>supprime</button>
                              <Link style={{ fontSize: '12px' }} to={`/edit/${vetement.idVetement}`} className="btn btn-success" >Modifier</Link>
                            </span>}
                          </div>
                        </div>
                      </div>
                    ))
                  : 
                  filterVet.length > 0
                    ? (filterVet
                      .map((vetement) => (
                        // <CardVet/>
                        <div className="col-lg-3 col-md-4 mb-4 mb-lg-0 vetement " key={vetement.idVetement} >
                          <div className="card rounded shadow-sm border-0 mb-5" style={{ height : "500px" }} >
                            <div className="card-body p-3">
                              <Link to={`/${vetement.idVetement}`} style={{ textDecoration: 'none', color: "black" }}>
                                <img style={{ height : "250px" }} className="card-img-top" src={vetement.imgVetement === undefined ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHaoJVhwD2T2Ip__F414Kk79ASasDUNHZFpQ&usqp=CAU" : vetement.imgVetement} alt={vetement.imgVetement} />
                                <h5 style={{ textTransform : "uppercase",fontSize: '18px' }} className="pt-3" >{isAdmin && vetement.idVetement}   {vetement.nomVetement}  </h5>
                                <p>
                                  <span ><AiFillDollarCircle className="mx-2 " style={Icon} />{vetement.categorie.nomCat}</span>
                                  <br /><span ><AiFillDollarCircle className="mx-2 " style={Icon} />{vetement.prixVetement ? vetement.prixVetement : '0'}  DT</span>
                                  <br /><span ><AiFillCalendar className="mx-2 " style={Icon} />{String(vetement.dateCreation).substr(0, 10)}</span>
                                </p>
                                <ul className="list-inline small ">
                                  {setStarts(vetement.rank)}
                                  <span className="badge bg-secondary mx-1">{vetement.rank}.0</span>
                                </ul>
                              </Link>
                              {isAdmin &&
                              <span className=" text-center" style={{ fontSize: '10px' }}>
                                <button style={{ fontSize: '12px' }} className="btn btn-danger mx-3" onClick={() => deleteVetement(vetement.idVetement)}>supprime</button>
                                <Link to={`/edit/${vetement.idVetement}`} className="btn btn-success" style={{ fontSize: '12px' }}>Modifier</Link>
                              </span>}
                            </div>
                          </div>
                        </div>
                      )))
                    : <h3 className="m-5"> No Data Found  </h3>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VetementList