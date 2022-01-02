package com.med.vetements.repos;

import com.med.vetements.entities.Categorie;
import com.med.vetements.entities.Vetement;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "rest")
public interface VetementRepository extends JpaRepository<Vetement, Long> {
	List<Vetement> findByNomVetement(String nom);
	List<Vetement> findByNomVetementContains(String nom);
	
	@Query("select v from Vetement v where v.nomVetement like %:nom  and v.prixVetement  > :prix")
	List<Vetement> findByNomPrix (@Param("nom") String nom,@Param("prix") Double prix);
	
	
	@Query("select v from Vetement v where v.categorie = ?1")
	List<Vetement> findByCategorie (Categorie categorie);
	
	List<Vetement> findByCategorieIdCat(Long id);
	
	List<Vetement> findByOrderByNomVetementAsc();
	
	
	@Query("select v from Vetement v order by v.nomVetement ASC, v.prixVetement DESC")
	List<Vetement> trierVetementsNomsPrix ();
}