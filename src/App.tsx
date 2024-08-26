import React from "react";
import "./styles/tw.css";

function App() {
  return (
    <>
      <div className="flex justify-center dark:bg-slate-800">
        <h1 className="text-9xl font-bold justify-self-start dark:text-slate-300">
          URL Shortener
        </h1>
      </div>

      <div className="dark:bg-slate-800 min-h-[100vh] text-[calc(10px + 2vmin)] text-white flex flex-col pt-12 items-center gap-5">
        <input
          className="dark:bg-slate-900 rounded-md dark:text-gray-200 p-2"
          value="Enter URL"
        ></input>

        <button className="bg-gray-200 rounded-md dark:text-black p-2 max-w-20">
          Shorten!
        </button>
      </div>
    </>
  );
}

export default App;
