export default function ProjectFooter() {
  return (
    <>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          marginBottom: "-20spx",
        }}
      >
        <p style={{ paddingRight: "10px" }}>
          <strong>Andrea Son - Section 2</strong>
        </p>
      </div>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <p>
          <strong>Client Repo: </strong>
        </p>
        <a
          style={{ paddingRight: "10px" }}
          href="https://github.com/SonAndrea/kambaz-next-js"
        >
          https://github.com/SonAndrea/kambaz-next-js
        </a>{" "}
        <p>
          <strong> Server Repo:</strong>{" "}
        </p>
        <a href="https://github.com/SonAndrea/kambaz-node-server-app">
          https://github.com/SonAndrea/kambaz-node-server-app
        </a>{" "}
      </div>
    </>
  );
}
