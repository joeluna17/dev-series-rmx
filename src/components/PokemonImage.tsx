import React from "react";

const PokemonImage = async () => {
  // Helper function to create a delay
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const timeout = 2000;

  // Wait for the delay first
  await delay(timeout);
  const data = await fetch("https://pokeapi.co/api/v2/pokemon/1", {
    cache: "no-store",
  });
  const json = await data.json();

  return (
    <div>
      <img
        src={json.sprites.front_default}
        alt={json.name}
        width={300}
        height={300}
      />
    </div>
  );
};

export default PokemonImage;
