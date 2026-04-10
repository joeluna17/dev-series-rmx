import { getPokemonList } from "@/service/pokemon.service";
import PokemonCard from "./PokemonCard";

// Separate async component for the Pokemon list
const PokemonListView = async () => {
  const pokemonList = await getPokemonList(3000);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr  1fr  1fr",
        gap: "10px",
      }}
    >
      {pokemonList.map((pokemon: { name: string; url: string }) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
      ))}
    </div>
  );
};

export default PokemonListView;
