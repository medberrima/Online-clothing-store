//Vetement.java
package com.med.vetements.entities;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Vetement {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long idVetement;

  private String nomVetement;
  private String imgVetement;
  private String descVetement;
  private Double prixVetement;
  private int rank;
  private Date dateCreation;
  

  @ManyToOne
  private Categorie categorie ;

  
}