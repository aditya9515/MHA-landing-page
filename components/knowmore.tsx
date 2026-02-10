"use client";

import React from "react";

export default function KnowMoreAboutMe() {
    const handleRedirect = () => {
        window.open("https://adityakosuru.online", "_blank");
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-zinc-900 rounded-2xl shadow-lg border border-zinc-800">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
            Want to know more about me?
        </h2>

        <button
            onClick={handleRedirect}
            className="px-6 py-3 bg-white text-black rounded-xl hover:bg-zinc-200 transition duration-300 shadow-md font-medium"
        >
            Visit My Website
        </button>
        </div>
    );
}