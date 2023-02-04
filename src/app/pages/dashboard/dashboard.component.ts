import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
/* TODO: generar una interface para implementarla en el array evolution para poder manipular la informacion en el modal */

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
  evolutionPokemons: any[] = [];
  evolutionsname: any[] = [];
  color: any;
  constructor(
    private usuarioService: UsuarioService,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /* TODO: Ya regresa los nombres de los pokemon en el nuevo arreglo falta sus card en el modal y pasarle bien la url */
    this.pokemonService.getPokemons().subscribe((response: any) => {
      response.results.forEach((result: any) => {
        this.pokemonService
          .getPokemonId(result.name)
          .subscribe((uniqResponse: any) => {
            this.pokemones.push(uniqResponse);
            this.name = uniqResponse.name;
          });
      });
    });
  }

  evolutions(nombre: String, url: String) {
    this.nombrePokemon = nombre;
    this.pokemonService.getEspecie(url).subscribe((resEspecie) => {
      /* Regresa las evoluciones */
      this.pokemonService
        .getEvolution(resEspecie.evolution_chain.url)
        .subscribe((res: any) => {
          /* evolucion lv1 */
          let pokemonLv1 = res.chain.species.name;
          const urlpokemonlv1 = `https://pokeapi.co/api/v2/pokemon-species/${pokemonLv1}/`;
          this.pokemonService
            .getEspecie(urlpokemonlv1)
            .subscribe((resPokemonLv1) => {
              this.pokemonService
                .getPokemonId(pokemonLv1)
                .subscribe((respPokemonInfo) => {
                  this.evolutionPokemons.push([
                    pokemonLv1,
                    resPokemonLv1,
                    respPokemonInfo,
                  ]);
                });
            });
          /* fin evolucion lv1 */
          console.log(this.evolutionPokemons);
          /* evolucion lv2 */
          if (res.chain.evolves_to.length !== 0) {
            let pokemonlv2 = res.chain.evolves_to[0].species.name;
            const urlpokemonl2 = `https://pokeapi.co/api/v2/pokemon-species/${pokemonlv2}/`;
            this.pokemonService
              .getEspecie(urlpokemonl2)
              .subscribe((resPokemonL2) => {
                this.pokemonService
                  .getPokemonId(pokemonlv2)
                  .subscribe((respPokemonInfo) => {
                    this.evolutionPokemons.push([
                      pokemonlv2,
                      resPokemonL2,
                      respPokemonInfo,
                    ]);
                  });
              });
            /* fin evolucion lv2 */

            /* evolucion lv3 */
            if (res.chain.evolves_to[0].evolves_to.length !== 0) {
              let pokemonlv3 =
                res.chain.evolves_to[0].evolves_to[0].species.name;

              const urlpokemonl3 = `https://pokeapi.co/api/v2/pokemon-species/${pokemonlv3}/`;
              this.pokemonService
                .getEspecie(urlpokemonl3)
                .subscribe((resPokemonL3) => {
                  this.pokemonService
                    .getPokemonId(pokemonlv3)
                    .subscribe((respPokemonInfo) => {
                      this.evolutionPokemons.push([
                        pokemonlv3,
                        resPokemonL3,
                        respPokemonInfo,
                      ]);
                    });
                });
            }
            /* fin evolucion lv3 */
          }
        });
      /* fin Regresa las evoluciones */
    });
  }
  cerrarModal() {
    this.evolutionPokemons.splice(0, this.evolutionPokemons.length);
  }
  getIdPokemon(id: String) {
    this.pokemonService.getPokemonId(id).subscribe((respPokemon: any) => {
      this.nombrePokemon = respPokemon.name;
    });
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
    localStorage.setItem('sesion', 'false');
  }

  buscarPokemon(pokemon: String) {
    console.log('buscar pokemon->' + pokemon);
    this.pokemonService.getPokemonId(pokemon).subscribe((respuesta: any) => {});
  }
}

/* 
TODO: 
funcion en el buscador falta filtrar las tarjetas
mostrar evoluciones en las card, ya esta el servicio falta la funcion para regresar las evoluciones 
para ello se necesita otro arreglo de pokemon por evolucion

*/
