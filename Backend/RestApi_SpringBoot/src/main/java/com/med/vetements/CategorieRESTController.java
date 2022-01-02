package com.med.vetements;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.med.vetements.entities.Categorie;
import com.med.vetements.service.CategorieService;

@CrossOrigin(origins="http://localhost:3000/")
@RestController
@RequestMapping("/cat")
public class CategorieRESTController {

  @Autowired
  CategorieService categorieService;
	
	@RequestMapping(method = RequestMethod.GET)
	public List<Categorie> getAllCategories() {
		return categorieService.getAllCategories() ;	
	}
	
	@RequestMapping(value="/{id}",method = RequestMethod.GET)
	public Categorie getCategorieById(@PathVariable("id") Long id) {
		return categorieService.getCategorie(id);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public Categorie createCategorie(@RequestBody Categorie Categorie) {
		return categorieService.saveCategorie(Categorie);
	}
	
	@RequestMapping(method = RequestMethod.PUT)
	public Categorie updateCategorie(@RequestBody Categorie Categorie) {
		return categorieService.updateCategorie(Categorie);
	}
	
	@RequestMapping(value="/{id}",method = RequestMethod.DELETE)
	public void deleteCategorie(@PathVariable("id") Long id){
		categorieService.deleteCategorieById(id);
	}
	

}
