import React from "react";
import AfomanjaNav from "./afomanja/AfomanjaNav";
import Register from "./afomanja/Register";

const RegisterPage = () => {
  return (
    <>
      <div className="w-screen h-screen relative bg-neutral-50 overflow-hidden">
        <AfomanjaNav />
        <Register />
      </div>
    </>
  );
};

export default RegisterPage;
