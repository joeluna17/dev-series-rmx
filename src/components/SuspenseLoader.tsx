"use client";

const SuspenseLoader = () => {
  const text = "SUSPENSE";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div style={{ display: "flex", gap: "4px" }}>
        {text.split("").map((letter, index) => (
          <span
            key={index}
            style={{
              fontSize: "60px",
              fontWeight: "bold",
              color: "#667eea",
              display: "inline-block",
              animation: `wave 1s ease-in-out infinite`,
              animationDelay: `${index * 0.1}s`,
              textShadow: `0 0 5px rgba(102, 126, 234, 0.8)`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
      <style>
        {`
          @keyframes wave {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default SuspenseLoader;
