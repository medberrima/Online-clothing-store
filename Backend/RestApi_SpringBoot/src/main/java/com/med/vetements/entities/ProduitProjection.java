package com.med.vetements.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "nomVet", types = { Vetement.class })
public interface ProduitProjection {
	public String getNomVetement();
}
