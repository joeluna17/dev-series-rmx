import React from "react";

const SpeciesDescription = async () => {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const timeout = 2500;

  // Wait for the delay first
  await delay(timeout);

  const data = await fetch("https://pokeapi.co/api/v2/pokemon-species/1", {
    cache: "no-store",
  });
  const json = await data.json();

  return (
    <div style={{ marginTop: "20px", padding: "20px", color: "#333", }}>
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          textTransform: "capitalize",
        }}
      >
        {json.name}
      </h2>
      <p>{json.flavor_text_entries[0].flavor_text}</p>
    </div>
  );
};

export default SpeciesDescription;
