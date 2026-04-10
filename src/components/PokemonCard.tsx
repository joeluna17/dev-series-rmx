"use client";

import { useState } from "react";
import Image from "next/image";

interface PokemonCardProps {
  name: string;
  url: string;
}

const PokemonCard = ({ name, url }: PokemonCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Extract Pokemon ID from URL to get the sprite
  const pokemonId = url.split("/").filter(Boolean).pop();
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: "12px",
        border: "none",
        margin: "10px",
        padding: "12px",
        height: "120px",
        background: isHovered
          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        boxShadow: isHovered
          ? "0 8px 25px rgba(102, 126, 234, 0.4)"
          : "0 4px 15px rgba(0, 0, 0, 0.1)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer",
      }}
    >
      {/* Pokemon Sprite */}
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: isHovered
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(255, 255, 255, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.3s ease",
        }}
      >
        <Image
          src={spriteUrl}
          alt={name}
          width={70}
          height={70}
          style={{
            objectFit: "contain",
            transition: "transform 0.3s ease",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Pokemon Name */}
        <div
          style={{
            fontWeight: "bold",
            color: isHovered ? "#fff" : "#2d3748",
            fontSize: "18px",
            textTransform: "capitalize",
            transition: "color 0.3s ease",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </div>

        {/* Pokemon ID Badge */}
        <div
          style={{
            fontSize: "12px",
            color: isHovered ? "rgba(255,255,255,0.8)" : "#718096",
            fontWeight: "500",
          }}
        >
          #{pokemonId?.padStart(3, "0")}
        </div>

        {/* View Details Button */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "12px",
            fontWeight: "600",
            backgroundColor: isHovered ? "#fff" : "#667eea",
            color: isHovered ? "#667eea" : "#fff",
            padding: "6px 12px",
            borderRadius: "20px",
            textDecoration: "none",
            alignSelf: "flex-start",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          View Details
        </a>
      </div>
    </div>
  );
};

export default PokemonCard;
