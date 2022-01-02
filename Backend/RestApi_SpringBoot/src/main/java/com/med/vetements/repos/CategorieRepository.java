package com.med.vetements.repos;


import com.med.vetements.entities.Categorie;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "rest")
public interface CategorieRepository extends JpaRepository<Categorie, Long> {

}