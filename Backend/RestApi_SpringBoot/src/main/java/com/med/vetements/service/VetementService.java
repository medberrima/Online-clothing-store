package com.med.vetements.service;


import java.util.List;

import com.med.vetements.entities.Categorie;
import com.med.vetements.entities.Vetement;

public interface VetementService {
	Vetement saveVetement(Vetement v);
	Vetement updateVetement(Vetement v);
	void deleteVetement(Vetement v);
	void deleteVetementById(Long id);
	Vetement getVetement(Long id);
	List<Vetement> getAllVetements();
	List<Vetement> findByNomVetement(String nom);
	List<Vetement> findByNomVetementContains(String nom);
	List<Vetement> findByNomPrix (String nom, Double prix);
	List<Vetement> findByCategorie (Categorie categorie);
	List<Vetement> findByCategorieIdCat(Long id);
	List<Vetement> findByOrderByNomVetementAsc();
	List<Vetement> trierVetementsNomsPrix();
}
