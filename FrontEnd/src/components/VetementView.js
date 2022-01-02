import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import {  useParams } from 'react-router-dom';
import VetementService from '../services/VetementService'
import './Vetement.css'
import {  AiFillStar } from 'react-icons/ai'
import { GiClothes } from 'react-icons/gi'


export const VetementView = () => {
  const [vetement, setVetement] = useState({
    nom: "",
    imgVetement: "",
    description: "",
    rank: "",
    dateCreation:"",
    prixVetement:"",
    categorie:{}
  });
  const { id } = useParams();

  useEffect(() => {
    getVetement();
  }, []);

  const getVetement = async () => {
    VetementService.get(id)
      .then((res)=>{ 
        setVetement(res.data);
      })
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
    // <div>
    //   <div className="container py-4">
    //   <Link className="btn btn-primary" to="/">
    //     back to Home
    //   </Link>
    //   <h1 className="display-4">vetement Id: {id}</h1>
    //   <hr />
    //   <ul className="list-group w-50">
    //     <li className="list-group-item">nom: {vetement.nomVetement}</li>
    //     <li className="list-group-item">Description: {vetement.descVetement}</li>
    //     <li className="list-group-item">Rank: {vetement.rank}</li>
    //     <li className="list-group-item">Price: {vetement.prixVetement}</li>
    //   </ul>
    // </div>
    // </div>
    <div className="section produit-info text-left">
        <div className="container">
        	<div className="row">
						<div className="col-md-6" >
              <Link className="primary-btn mb-2" to="/vetements"> back to Home</Link>
							<div id="product-main-img">
								<div className="product-preview text-center ">
										<img src={vetement.imgVetement} alt=""/>
								</div>  
							</div>
						</div>
						<div className="col-md-5">
							<div className="product-details">
								<h2 className="product-name mt-5">{vetement.nomVetement}</h2>
								<div>
									<div className="product-rating">
                    {setStarts(vetement.rank)}
                    <span className="badge bg-secondary mx-1">{vetement.rank}.0</span>

									</div>
									{/* <a className="review-link" href="#">10 Review(s) | Add your review</a> */}
								</div>
								<div>
									<h3 className="product-price">{vetement.prixVetement} Dt</h3>
									<span className="product-available">In Stock</span>
								</div>
								<p>{vetement.descVetement}</p>

								<div className="add-to-cart">
									<div className="qty-label">
										Qty
										<div className="input-number">
											<input type="number"/>
											<span className="qty-up">+</span>
											<span className="qty-down">-</span>
										</div>
									</div>
									<button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
								</div>

								<ul className="product-btns">
									<li><a href="#"><i className="fa fa-heart-o"></i> add to wishlist</a></li>
								</ul>

								<ul className="product-links">
									<li>Category:</li>
									<li><a href="#">{vetement.categorie.nomCat}</a></li>

								</ul>

								{/* <ul className="product-links">
									<li>Share:</li>
									<li><a href="#"><i className="fa fa-facebook"></i></a></li>
									<li><a href="#"><i className="fa fa-twitter"></i></a></li>
									<li><a href="#"><i className="fa fa-google-plus"></i></a></li>
									<li><a href="#"><i className="fa fa-envelope"></i></a></li>
								</ul> */}

							</div>
						</div>

				
					</div>
 				</div>
		</div>
  )
}
