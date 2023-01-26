import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemones: any[] = [];
  constructor(private http: HttpClient) {}

  getPokemons() {
    return this.http.get(environment.url + 'pokemon?limit=25');
  }

  getPokemonId(id: String) {
    return this.http.get(environment.url + `pokemon/${id}`);
  }
}
