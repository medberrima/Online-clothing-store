import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import CategorieService from '../services/CategorieService';
import VetementService from '../services/VetementService';

const EditVetement = () => {

  const history = useHistory();
  const { id } = useParams();
  const [vetement, setVetement] = useState({idVetement: id,imgVetement: "", nomVetement: "", descVetement: "", prixVetement: "", rank: "", dateCreation: new Date(),categorie:{} });
  const [categories, setCategories] = useState([]);
  const [selectValue, setSelectValue] = useState(0);
  
  useEffect(() => {
    getCategories();
    getVetementById();
  }, []);
  

  
  const onInputChange = e => {
    const { name, value } = e.target;
    setVetement({ ...vetement, [name]: value });
  };

  const updateVetement = async (e) => {
    e.preventDefault();
    console.log(vetement);
    VetementService.update( vetement)
      .then(() => { history.push("/vetements"); })
      .catch(e => { console.log(e); });
  }

  
  const getVetementById = async () => {
    VetementService.get(id)
      .then((res) => {
        setVetement(res.data);
        setSelectValue(res.data.categorie.idCat);
      })
  }

  const categorieChange = (e) => {
    CategorieService.get(e.target.value)
    .then((res) => {
      setSelectValue(res.data.idCat);
      vetement.categorie = res.data
    })
  };

  const getCategories = async () => {
    
    CategorieService.getAll()
    .then((res) => { setCategories(res.data);})
    .catch(e => { console.log(e); });
  }

  return (
    <div className="container " style={{marginTop:"100px"}}>

      <div>
        <h1> update Vetement</h1>
        <form className="d-flex align-items-center flex-column justify-content-center h-100 " >
          {/* <div className="col-sm-2 col-md-2 ">
            <div className="form-group my-3">
              <label htmlFor="exampleFormControlFile1">Image </label>
              <input type="file" className="form-control-file" id="exampleFormControlFile1" />
            </div>
          </div> */}
          <div className=" col-8 mt-4 ">
            <label>Name </label>
            <input type="text" name="nomVetement" className="form-control" value={vetement.nomVetement} onChange={onInputChange} required />
          </div>
          <div className=" col-8 mt-4 ">
            <label>img Vetement </label>
            <input type="text" name="imgVetement" className="form-control" value={vetement.imgVetement} onChange={onInputChange} required />
          </div>
          <div className=" col-8 mt-4 ">
            <label>Description </label>
            <textarea type="text" name="descVetement" rows="6"  className="form-control" value={vetement.descVetement} onChange={onInputChange} required />
          </div>
          <div className=" col-8 mt-4 ">
              <label>categories </label>
              <select value={selectValue} onChange={categorieChange} className="form-control" >
                <option value="select">- Select Categorie - </option>
                {categories.map(cat=> <option value={cat.idCat} key={cat.idCat}> {cat.nomCat}</option>)}
              </select> 
            </div>
          <div className=" col-8 mt-4 ">
            <label>Price</label>
            <input type="number" name="prixVetement" className="form-control" value={vetement.prixVetement} onChange={onInputChange} required />
          </div>
          <div className=" col-8 mt-4 ">
            <label>Rank</label>
            <input type="number" name="rank" className="form-control" value={vetement.rank} onChange={onInputChange} min="0" max="5" required />
          </div>
          <div className="mt-2">
            <button type="submit" className="btn btn-success my-5" onClick={updateVetement}>Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditVetement