import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AiFillCalendar, AiFillStar, AiFillDollarCircle } from 'react-icons/ai'
import VetementService from '../services/VetementService'

export const CardVet = (vetement) => {
  const [vetements, setVetement] = useState([]);
  
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
  return (
    <div className="col-lg-3 col-md-4 mb-4 mb-lg-0 vetement " key={vetement.idVetement}>
    <div className="card rounded shadow-sm border-0 mb-5" >
      <div className="card-body p-3">
        <Link to={`/${vetement.idVetement}`} style={{ textDecoration: 'none', color: "black" }}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHaoJVhwD2T2Ip__F414Kk79ASasDUNHZFpQ&usqp=CAU" alt="edfdef " className="img-fluid d-block mx-auto mb-3" />
          <h5 > {vetement.idVetement} - {vetement.nomVetement}-  </h5>
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
        <span className=" text-center">
          <button className="btn btn-danger mx-4" onClick={() => deleteVetement(vetement.idVetement)}>supprime</button>
          <Link to={`/edit/${vetement.idVetement}`} className="btn btn-success" >Modifier</Link>
        </span>
      </div>
    </div>
  </div>
  )
}
