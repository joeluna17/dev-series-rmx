import PokemonCard from "@/components/PokemonCard";
import { getPokemonList } from "@/service/pokemon.service";
import React from "react";

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
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Pokemon Page</h1>
      <div style={{ marginBottom: "20px" }}>
        <p>
          This text is static text, but because the Pokemon data is being
          fetched asynchronously and the suspense is wrapped at the page level
          using the loading.tsx page, there will be a loading state before the
          data is displayed before this text is visible. Not exactly ideal, but
          it shows how suspense boundaries work at the page level.
        </p>
      </div>
      <PokemonListView />
    </div>
  );
};

export default page;
