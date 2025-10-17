import React from "react";
import AfomanjaNav from "./afomanja/AfomanjaNav";
import Register from "./afomanja/Register";
import BackBtn from "./afomanja/BackBtn";
import { SpaceCanvas } from "./Home/ThreeDCharacter";

const RegisterPage = () => {
  return (
    <>
      <div className="w-screen h-screen relative bg-neutral-50 overflow-hidden">
        <BackBtn/>
        <SpaceCanvas/>
        <Register />
      </div>
    </>
  );
};

export default RegisterPage;
