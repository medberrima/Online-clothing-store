package com.med.vetements;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.med.vetements.entities.Vetement;
import com.med.vetements.service.VetementService;

@CrossOrigin(origins="http://localhost:3000/")
@RestController
@RequestMapping("/api")
public class VetementRESTController {
	@Autowired
	VetementService vetementService;
	
	@RequestMapping(method = RequestMethod.GET)
	public List<Vetement> getAllProduits() {
		return vetementService.getAllVetements() ;	
	}
	
	@RequestMapping(value="/{id}",method = RequestMethod.GET)
	public Vetement getVetementById(@PathVariable("id") Long id) {
		return vetementService.getVetement(id);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public Vetement createVetement(@RequestBody Vetement vetement) {
		return vetementService.saveVetement(vetement);
	}
	
	@RequestMapping(method = RequestMethod.PUT)
	public Vetement updateVetement(@RequestBody Vetement vetement) {
		return vetementService.updateVetement(vetement);
	}
	
	@RequestMapping(value="/{id}",method = RequestMethod.DELETE)
	public void deleteVetement(@PathVariable("id") Long id){
		vetementService.deleteVetementById(id);
	}
	
	@RequestMapping(value="/prodscat/{idCat}",method = RequestMethod.GET)
	public List<Vetement> getVetementsByCatId(@PathVariable("idCat") Long idCat) {
		return vetementService.findByCategorieIdCat(idCat);
	}
}
