
//CategorieServiceImp.java
package com.med.vetements.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.med.vetements.entities.Categorie;
import com.med.vetements.repos.CategorieRepository;


@Service
public class CategorieServiceImpl implements CategorieService {

  @Autowired
  CategorieRepository categorieRepository;

  @Override
  public Categorie saveCategorie(Categorie v) {
    return categorieRepository.save(v);
  }

  @Override
  public Categorie updateCategorie(Categorie v) {
    return categorieRepository.save(v);
  }

  @Override
  public void deleteCategorie(Categorie v) {
    categorieRepository.delete(v);
  }

  @Override
  public void deleteCategorieById(Long id) {
    categorieRepository.deleteById(id);
  }

  @Override
  public Categorie getCategorie(Long id) {
    return categorieRepository.findById(id).get();
  }

  @Override
  public List<Categorie> getAllCategories() {
    return categorieRepository.findAll();
  }

	
}
