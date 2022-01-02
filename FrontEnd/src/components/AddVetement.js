import React, { useState, useEffect} from "react";
import { Link, useHistory } from 'react-router-dom';
import CategorieService from "../services/CategorieService";
import VetementService from '../services/VetementService';

const Addvetement = () => {
  const history = useHistory();
  const initialState = {nomVetement: "", imgVetement: "" ,descVetement: "",prixVetement:"",rank:"",dateCreation: new Date(),categorie:{}}

  const [vetement, setVetement] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [selectValue, seSelectValue] = useState();
  const [submitted, setSubmitted] = useState(false);


  const onInputChange = e => {
    const { name, value } = e.target;
    setVetement({ ...vetement, [name]: value });
  };

  useEffect(() => { getCategories(); }, []);
  
  const getCategories = async () => {
    CategorieService.getAll()
    .then((res) => { setCategories(res.data);})
    .catch(e => { console.log(e); });
  }

  const categorieChange = (e) => {
    CategorieService.get(e.target.value)
    .then((res) => {
      vetement.categorie = res.data
    })
  };


  const saveVetement = async (e) => {
    e.preventDefault();
    VetementService.create(vetement)
      .then(() => {
        // history.push("/");
        setSubmitted(true);
        console.log('vetement is add')
      })
      .catch(e => { console.log(e); });
    
  }

  const newVetement = () => {
    setSubmitted(false);
    setVetement(initialState)
  };

  return (
    <div className="container " style={{marginTop:"150px"}}>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <Link className="btn btn-dark m-2" to="/vetements">
            Return
          </Link>
          <button className="btn btn-success m-2" onClick={newVetement}>
          Add 
          </button>
        </div>
      ) : (
        <div>
          <h1> Add Vetement</h1>
          <form className="d-flex align-items-center flex-column justify-content-center h-100 " >
            {/* <div className="col-sm-2 col-md-2 col-lg-3">
              <div className="form-group my-3">
                <label htmlFor="exampleFormControlFile1">Image </label>
                <input type="file" className="form-control-file" id="exampleFormControlFile1" />
              </div>
            </div> */}
            <div className="col-sm-4 col-md-4 col-lg-3">
              <label>Name </label>
              <input type="text" name="nomVetement" className="form-control" value={vetement.nomVetement} onChange={onInputChange} required/>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-3">
              <label>img Vetement </label>
              <input type="text" name="imgVetement" className="form-control" value={vetement.imgVetement} onChange={onInputChange} required />
            </div>
            <div className="col-sm-4 col-md-4 col-lg-3">
              <label>categories </label>
              <select value={selectValue} onChange={categorieChange} className="form-control" >
                <option value="select">- Select Categorie - </option>
                {categories.map(cat=> <option value={cat.idCat} key={cat.idCat}> {console.log(cat.idCat+" = "+cat.nomCat)}{cat.nomCat}</option>)}
              </select> 
            </div>
            <div className="col-sm-4 col-md-4 col-lg-3">
              <label>Description </label>
              <textarea type="text" name="descVetement" className="form-control" value={vetement.descVetement} onChange={onInputChange} required/>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-3">
              <label>Price</label>
              <input type="number" name="prixVetement" className="form-control" value={vetement.prixVetement} onChange={onInputChange} required/>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-3">
              <label>Rank</label>
              <input type="number" name="rank" className="form-control" value={vetement.rank} onChange={onInputChange} min="0" max="5" required/>
            </div>
            <div className="mt-2">
              <button type="submit" className="btn btn-success my-5" onClick={saveVetement}>Ajouter</button>
            </div>
          </form>
        </div>
      )}
    </div >
  );
}

export default Addvetement;
