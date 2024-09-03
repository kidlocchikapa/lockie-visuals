import React from "react";
import LogoImage from "./LogoImage.png";


function Test() {
  return (
    <>
      <div className="text-center text-lg text-amber-950">Hello World</div>
      <div className=" bg-gray-700 mg:hidden rounded-md w-full h-60 my-2 p-2">
        <p className="text-lg p-9 text-center font-extrabold font-sans text-white">
          MyTailwindExperience
        </p>
      </div>
      <div className="bg-red-200 w-10 h-10"></div>
      <div className="flex justify-center space-x-4">
        <div className=" bg-blue-800 w-10 h-10 rounded-full"></div>
        <div className=" bg-blue-800 w-10 h-10 rounded-full"></div>
      </div>
      <div className="md:block">
        <p className="text-blue-700 px-10">iwe fernando show at pixels</p>
      </div>
      <button className=" rounded-md bg-blue-500 text-white hover:bg-blue-800 px-4 py-2 ">
        ClickMe
      </button>
      <div className="m-10 md:max-[hidden] rounded-lg bg-white px-6 py-6 shadow-xl hover:bg-gray-200 ring-1 ring-slate-900/5 ">
        <img className="p-2 " src={LogoImage} alt="Logo" />
        <p className="text-blue-600 text-lg font-bold">
          This is my first card{" "}
        </p>
        <p>
          this was the first card i made when i was exploring my tailwind
          experience
        </p>
        <button className="text-white hover:bg-blue-300 px-4 py-2 text-sm font-medium mt-8 bg-blue-600 rounded-md">
          Learn More from us
        </button>
      </div>
    </>
  );
}

export default Test;
