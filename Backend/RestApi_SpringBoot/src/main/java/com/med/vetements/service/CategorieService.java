package com.med.vetements.service;


import java.util.List;

import com.med.vetements.entities.Categorie;


public interface CategorieService {
	Categorie saveCategorie(Categorie v);
	Categorie updateCategorie(Categorie v);
	void deleteCategorie(Categorie v);
	void deleteCategorieById(Long id);
	Categorie getCategorie(Long id);
	List<Categorie> getAllCategories();

}
