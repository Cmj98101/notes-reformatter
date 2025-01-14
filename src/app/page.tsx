"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [analyzing, toggleAnalyze] = useState(false);

  function startAnalyzing() {
    if (analyzing) {
      const status = document.getElementById("status");
      if (status) {
        status.innerHTML = "Analyzing...";
      }
      console.log("Analyzing...");
    }
  }

  function stopAnalyzing() {
    const status = document.getElementById("status");
    if (status) {
      status.innerHTML = "Stopped Analyzing";
    }
    console.log("Stopped Analyzing");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10">
      <h1 id="status" className="font-bold text-4xl">
        Status: <span className="text-primary">idle</span>
      </h1>
      <button
        id="toggleAnalyzingButton"
        className="btn btn-primary text-secondary"
        onClick={() => {
          toggleAnalyze(!analyzing);
          if (analyzing) {
            startAnalyzing();
          } else {
            stopAnalyzing();
          }
        }}
      >
        Start / Stop Analyzing
      </button>
    </div>
  );
}
