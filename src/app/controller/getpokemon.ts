import { Pokemon } from '../interfaces/interfaces';

export async function getPokemons(): Promise<Pokemon[]> {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/{pikachu}/');

  const datos = await response.json();
  const pokemons = datos.forms.map((pokemon: any) => ({
    name: pokemon.name,
    id: pokemon.id,
    urlImg: pokemon.sprites['front_default'],
  }));

  return pokemons;
}
