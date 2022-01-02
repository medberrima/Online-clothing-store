package com.med.vetements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import com.med.vetements.entities.Vetement;

@SpringBootApplication
public class VetementsApplication implements CommandLineRunner {

	@Autowired
	private RepositoryRestConfiguration repositoryRestConfiguration;
	
	public static void main(String[] args) {
		SpringApplication.run(VetementsApplication.class, args);
	}

	  @Override
	  public void run(String... args) throws Exception {
		  repositoryRestConfiguration.exposeIdsFor(Vetement.class);
	  }
}
