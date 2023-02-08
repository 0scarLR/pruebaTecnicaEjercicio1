import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
  evolutionPokemons: any[] = [];
  evolutionsname: any[] = [];
  load: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.pokemonService.getPokemons().subscribe((response: any) => {
      response.results.forEach((result: any) => {
        /*  */
        setTimeout(() => {
          this.pokemonService
            .getPokemonId(result.name)
            .subscribe((uniqResponse: any) => {
              //console.log(uniqResponse);
              this.load = true;
              if (uniqResponse) {
                this.pokemones.push(uniqResponse);
              }
              this.name = uniqResponse.name;
            });
        }, 400);
        /*  */
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
  limpiarArray() {
    this.evolutionPokemons.splice(0, this.evolutionPokemons.length);
  }
  limpiarArraryPokemons() {
    this.pokemones.splice(0, this.pokemones.length);
  }
  getIdPokemon(id: String) {
    this.pokemonService.getPokemonId(id).subscribe((respPokemon: any) => {
      this.nombrePokemon = respPokemon.name;
    });
  }
  getPokemonTipo(tipo: String) {
    this.limpiarArraryPokemons();
    this.pokemonService.getPokemonTipo(tipo).subscribe(
      (resp: any) => {
        /*  */
        if (resp) {
          resp.pokemon.forEach((result: any) => {
            //console.log(result);
            if (result.slot == 1) {
              this.pokemonService
                .getPokemonId(result.pokemon.name)
                .subscribe((respTipo: any) => {
                  this.pokemones.push(respTipo);
                });
            }
          });
        }
      },
      (err) => {
        Swal.fire('Pokemon no encontrado y tipo', err.error.msg, 'error');
      }
    );
    /* TODO: loader de carga y paginacion */
  }

  buscarPokemon(pokemon: String) {
    if (pokemon != '') {
      setTimeout(() => {
        this.pokemonService.getPokemonId(pokemon).subscribe(
          (respuesta: any) => {
            if (respuesta) {
              this.limpiarArraryPokemons();
              this.pokemones.push(respuesta);
            } else {
              this.pokemones;
            }
          },
          (err) => {
            if (err) {
              this.getPokemonTipo(pokemon);
            }
          }
        );
      }, 400);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Ingresa un Pokemon, ID o Tipo para la busqueda',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
    localStorage.setItem('sesion', 'false');
  }
}

/* 
TODO: 

*/
