import PokemonImage from "@/components/PokemonImage";
import PokemonListSkeleton from "@/components/PokemonListSkeleton";
import PokemonListView from "@/components/PokemonListView";
import SpeciesDescription from "@/components/SpeciesDescription";
import React, { Suspense } from "react";
import Skeleton from "react-loading-skeleton";

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
          This text is static and will be visible immediately! The Pokemon
          content in the Bento layout below has its own Suspense boundaries for
          the list, image, and description so there is a loading state while the
          async data is being fetched.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          height: "80vh",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            height: "100%",
            width: "100%",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
            gap: "16px",
            backgroundColor: "#616161",
            padding: "8px",
            borderRadius: "8px",
            boxShadow:
              "0 2px 4px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              gridColumn: "span 3",
              gridRow: "span 3",
              borderRadius: "8px",
              boxShadow:
                "0 2px 4px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.1)",
              overflowY: "auto",
              padding: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <Suspense fallback={<PokemonListSkeleton />}>
              <PokemonListView />
            </Suspense>
          </div>

          <div
            style={{
              fontFamily: "'M PLUS 2 Variable', sans-serif",
              gridColumn: "span 1",
              gridRow: "span 3",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "8px",
              boxShadow:
                "0 2px 4px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Suspense
              fallback={
                <Skeleton
                  width={200}
                  height={200}
                  style={{ borderRadius: "8px" }}
                />
              }
            >
              <PokemonImage />
            </Suspense>
          </div>

          <div
            style={{
              fontFamily: "'M PLUS 2 Variable', sans-serif",
              gridColumn: "span 1",
              gridRow: "span 4",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "8px",
              boxShadow:
                "0 2px 4px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage:
                "url('https://freedesignfile.com/image/preview/7871/pokemon-pikachu-vector.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div
            style={{
              fontFamily: "'M PLUS 2 Variable', sans-serif",
              gridColumn: "span 2",
              gridRow: "span 2",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "8px",
              boxShadow:
                "0 2px 4px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Suspense
              fallback={
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginTop: "20px",
                    padding: "20px",
                  }}
                >
                  <Skeleton
                    width={200}
                    height={24}
                    style={{ borderRadius: "8px" }}
                  />
                  <Skeleton />
                  <Skeleton width={200} />
                </div>
              }
            >
              <SpeciesDescription />
            </Suspense>
          </div>

          <div
            style={{
              color: "#333",
              fontFamily: "'M PLUS 2 Variable', sans-serif",
              gridColumn: "span 1",
              gridRow: "span 2",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "8px",
              boxShadow:
                "0 2px 4px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ fontWeight: "bold", fontSize: "30px" }}>Pokémon</p>
          </div>

          <div
            style={{
              color: "#333",
              fontFamily: "'M PLUS 2 Variable', sans-serif",
              gridColumn: "span 3",
              gridRow: "span 2",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "8px",
              boxShadow:
                "0 2px 4px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <p>
              This is example static content to illustrate having mixed areas in
              the layout that is static and async and how a suspense boundary
              can be used to manage loading states.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
