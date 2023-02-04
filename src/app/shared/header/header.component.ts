import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  pokemonResponse: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {}
  cerrarSesion() {
    this.router.navigate(['/login']);
    localStorage.setItem('sesion', 'false');
  }

  buscarPokemon(pokemon: String) {
    console.log('buscar pokemon->' + pokemon);
    this.pokemonService.getPokemonId(pokemon).subscribe((respuesta: any) => {
      this.pokemonResponse = respuesta;
      console.log(this.pokemonResponse);
    });
  }
}

//TODO YA REGRESA EL OBJETO POKEMON, AHORA HAY QUE IMPLEMENTAR CON LAS TARJETAS
