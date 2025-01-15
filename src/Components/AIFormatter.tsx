"use client";
import { useState } from "react";
import { debounce } from "lodash";

const AIFormatter: React.FC = () => {
  const [analyzing, toggleAnalyze] = useState(false);
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.result);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center p-20 gap-10">
      <h1>Ask the AI</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          rows={5}
          cols={50}
          className="textarea textarea-bordered"
        />
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      {response && (
        <div className="mt-20">
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}

      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default AIFormatter;
