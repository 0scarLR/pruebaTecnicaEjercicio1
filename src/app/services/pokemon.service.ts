import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { PokemonSpecie } from '../models/pokemon.specie';
import { PokemonTipo } from '../models/pokemon.tipo';
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemones: any[] = [];
  private limit = 100;
  constructor(private http: HttpClient) {}

  getPokemons() {
    return this.http.get(environment.url + `pokemon?limit=${this.limit}`);
  }

  getPokemonId(id: String) {
    return this.http.get<Pokemon>(environment.url + `pokemon/${id}`);
  }

  getEspecie(url: String) {
    return this.http.get<PokemonSpecie>(url + '');
  }
  getEvolution(url: String) {
    return this.http.get(url + '');
  }
  getPokemonTipo(tipo: String) {
    return this.http.get<PokemonTipo>(environment.url + `type/${tipo}`);
  }
}
