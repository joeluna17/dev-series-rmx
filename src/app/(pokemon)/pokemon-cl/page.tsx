import PokemonListSkeleton from "@/components/PokemonListSkeleton";
import PokemonListView from "@/components/PokemonListView";
import React, { Suspense } from "react";

const Page = () => {
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
          This text is static and will be visible immediately! The Pokemon list
          below has its own Suspense boundary, so only the list shows a loading
          state while the data is being fetched.
        </p>
      </div>
      <Suspense fallback={<PokemonListSkeleton />}>
        <PokemonListView />
      </Suspense>
    </div>
  );
};

export default Page;
