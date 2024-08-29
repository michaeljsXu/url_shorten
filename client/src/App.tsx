import { useState } from "react";
import "./styles/tw.css";
import packageJson from '../package.json';

const proxy = packageJson.proxy;
const api_url = proxy + "/api/shorturl/"

function App() {
  const [urlInput, setUrlInput] = useState("Enter URL");
  const [shortenUrl, setShortenUrl] = useState("");
  const statusMessage = shortenUrl === 'error' ? "Error with converting URL" : `Your shortened link is ` + api_url + shortenUrl;

  const handleURLChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUrlInput(e.currentTarget.value);
  };

  const handleShortenClick = () => {
    fetch(`/api/shorturl`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: urlInput,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if ('error' in data) setShortenUrl('error')
        else setShortenUrl(''+data.shorten_url)
      });
  };

  return (
    <>
      <div className="flex justify-center dark:bg-slate-800">
        <h1 className="text-9xl font-bold justify-self-start dark:text-slate-300">
          URL Shortener
        </h1>
      </div>

      <div className="dark:bg-slate-800 min-h-[100vh] text-white flex flex-col pt-12 items-center gap-3">
        <input
          onChange={handleURLChange}
          className="dark:bg-slate-900 rounded-md dark:text-gray-200 p-2 text-3xl"
          placeholder="Enter URL"
        ></input>

        <button
          onClick={handleShortenClick}
          className="bg-gray-200 rounded-md dark:text-black p-2 max-w-20 text-3xl"
        >
          Shorten!
        </button>

        {shortenUrl && <a className="text-xl" href={api_url+shortenUrl}>{statusMessage}</a>}
      </div>
    </>
  );
}

export default App;
