import { BiArrowBack } from "react-icons/bi"; 

import React from "react";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
  return (
    <>
      <div className="absolute top-6 left-4 cursor-pointer z-20">
        <button 
        onClick={goBack}
        className="text-neutral-200 text-lg group pl-5 pr-7 cursor-pointer bg-neutral-200/20 py-1 border-2 border-neutral-200 rounded-lg uppercase flex items-center gap-2 font-semibold">
          <BiArrowBack />
          <span className="font-teko mt-0.5">Retour</span>
        </button>
      </div>
    </>
  );
};

export default BackBtn;
