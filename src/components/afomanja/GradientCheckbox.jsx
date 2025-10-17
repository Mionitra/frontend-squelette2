import React from "react";

const GradientCheckbox = () => {
  return (
    <>
      <div className="relative">
        <label
          for="checkbox"
          className="relative flex size-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-tr from-white to-cyan-400 p-2 duration-100 hover:p-2.5"
        >
          <input type="checkbox" className="group peer hidden" id="checkbox" />
          <label
            for="checkbox"
            className="size-full rounded-full bg-neutral-900 peer-checked:size-0"
          ></label>
          <div className="absolute left-[0.8rem] h-[4px] w-[25px] -translate-y-10 translate-x-10 rotate-[-41deg] rounded-sm bg-black duration-300 peer-checked:translate-x-0 peer-checked:translate-y-0"></div>
          <div className="absolute left-1.5 top-5.5 h-[4px] w-[15px] -translate-x-10 -translate-y-10 rotate-[45deg] rounded-sm bg-black duration-300 peer-checked:translate-x-0 peer-checked:translate-y-0"></div>
        </label>
      </div>
    </>
  );
};

export default GradientCheckbox;
