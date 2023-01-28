import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  pokemones: any[] = [];
  selectedUsuario$ = this.usuarioService.usuario$;
  name: any;
  nombrePokemon: any;
  descriptionPokemon: any;

  constructor(
    private usuarioService: UsuarioService,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.getDescription('1');
    this.pokemonService.getPokemons().subscribe((response: any) => {
      response.results.forEach((result: any) => {
        this.pokemonService
          .getPokemonId(result.name)
          .subscribe((uniqResponse: any) => {
            this.pokemones.push(uniqResponse);
            this.name = uniqResponse.name;
            console.log(uniqResponse);
          });
      });
    });
  }
  getIdPokemon(id: String) {
    this.pokemonService.getPokemonId(id).subscribe((respPokemon: any) => {
      this.nombrePokemon = respPokemon.name;
    });
  }

  getDescription(id: String) {
    this.pokemonService.getDescription(id).subscribe((respDescription: any) => {
      this.descriptionPokemon = respDescription;
      console.log('metodo description ' + this.descriptionPokemon);
    });
  }
}
