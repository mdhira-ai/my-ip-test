"use client";
import axios from "axios";
import Image from "next/image";
import React from "react";

export default function Home() {
  const myurl = React.useRef();

  async function getUrl() {
    console.log(myurl.current.value);
    const res = await fetch(`api/scrape?url=${myurl.current.value}`)
    const data = await res.json()
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div>
          <input
            ref={myurl}
            type="url"
            placeholder="https://www.youtube.com/watch?v=6Dh-RL__uN4"
            className=" px-4 py-2 outline-none text-lg text-purple-heart-950 placeholder-gray-500 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />

          <button
            onClick={getUrl}
            className="px-4 py-2 text-lg text-white bg-purple-heart-950 hover:bg-purple-heart-900 rounded-md"
          >
            scrape
          </button>
        </div>

        <div></div>
      </div>
    </>
  );
}
