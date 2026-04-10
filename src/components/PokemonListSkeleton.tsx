import Skeleton from "react-loading-skeleton";

// Loading skeleton component
const PokemonListSkeleton = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: "30px",
      }}
    >
      {Array.from({ length: 16 }).map((_, index) => (
        <Skeleton key={index} height={120} style={{ borderRadius: "10px" }} />
      ))}
    </div>
  );
};

export default PokemonListSkeleton;
