// Helper function to create a delay
const timeout = 3000;

const fakeFetch = <T>(data: T, delayMs: number): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), delayMs));

// Fetch Pokemon list from API
const fetchPokemonList = async (): Promise<
  Array<{ name: string; url: string }>
> => {
  const data = await fetch("https://pokeapi.co/api/v2/pokemon");
  const json = await data.json();
  return json.results as Array<{ name: string; url: string }>;
};

export const getPokemonList = async (
  _timeout?: number,
): Promise<Array<{ name: string; url: string }>> => {
  const pokemonList = await fetchPokemonList();
  return fakeFetch(pokemonList, _timeout ?? timeout);
};
