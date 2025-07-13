import React, { useRef } from "react";
import TypeAnimation from "../components/TypeAnimation";

const Home = () => {
  return (
    <div>
      <TypeAnimation sequence={["Hello", "World"]} />
    </div>
  );
};

export default Home;
