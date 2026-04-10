import PokemonListSkeleton from "@/components/PokemonListSkeleton";
import React from "react";
import Skeleton from "react-loading-skeleton";

const loading = () => {
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
      <div>
        <Skeleton
          height={24}
          width={300}
          style={{ borderRadius: "10px", marginBottom: "10px" }}
        />
        <Skeleton
          height={60}
          style={{ borderRadius: "10px", marginBottom: "10px" }}
        />
      </div>
      <div>
        <PokemonListSkeleton />
      </div>
    </div>
  );
};

export default loading;
