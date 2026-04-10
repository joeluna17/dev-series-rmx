import React from "react";
import PokemonCard from "@/components/PokemonCard";
import { getPokemonList } from "@/service/pokemon.service";

const page = async () => {
  const pokemonList = await getPokemonList(3000);

  const PokemonListView = () => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr  1fr  1fr",
          gap: "10px",
        }}
      >
        {pokemonList.map((pokemon: { name: string; url: string }) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        width: "90%",
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
        Pokemon Leaf Route Page
      </h1>
      <div style={{ marginBottom: "20px" }}>
        <p>
          This is a leaf route page that fetches Pokemon data with a delay to
          demonstrate how suspense boundaries work. Because the base route is
          wrapped in a suspense boundary, this leaf route can show a loading
          state while the data is being fetched.
        </p>
      </div>
      <PokemonListView />
    </div>
  );
};

export default page;
