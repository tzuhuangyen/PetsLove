import React from "react";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>this is Home page</h1>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}

export default Home;
