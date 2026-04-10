import Loader from "@/components/Loader";

const loading = () => {
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        height: "100vh",
        margin: "0 auto",
      }}
    >
      <h3>Loading...</h3>
      <Loader />
    </div>
  );
};

export default loading;
