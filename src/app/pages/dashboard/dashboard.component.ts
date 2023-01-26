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

  constructor(
    private usuarioService: UsuarioService,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((response: any) => {
      response.results.forEach((result: any) => {
        this.pokemonService
          .getPokemonId(result.name)
          .subscribe((uniqResponse: any) => {
            this.pokemones.push(uniqResponse);
            console.log(this.pokemones);
          });
      });
    });
  }
}
