import React from "react";
import Navbar from "./Navbar";
import Util1 from "./Util1";

export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div style={{ marginTop: "30px" }}>
        <Util1 />
      </div>
    </div>
  );
}
