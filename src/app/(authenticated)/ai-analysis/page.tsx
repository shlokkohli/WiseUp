"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import promptSuggestions from "@/helper/promptSuggestions";
import GenericLoader from "@/components/skeletons/GenericLoader";
import { Button } from "@/components/MyUi/Button";

export default function AIAnalysisPage() {
  const [prompt, setPrompt] = useState("");
  const [responseText, setResponseText] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (prompt: string) => {
      const res = await fetch("/api/aiAnalysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error("AI analysis failed");
      const body = await res.json();
      return body.response;
    },
    onSuccess(data) {
      setResponseText(data);
    },
    onError(err: any) {
      setResponseText(`Error: ${err.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setResponseText(null);
    mutation.mutate(prompt);
  };

  const chooseSuggestion = (s: string) => {
    setPrompt(s);
    setResponseText(null);
    mutation.mutate(s);
  };
  const finalText = responseText?.replace(/\n\n/g, "\n");

  return (
    <div className="md:w-[80%] w-[96%] mx-auto p-4 space-y-6">
      <h1 className="text-2xl text-gray-700 font-bold">AI Spending Analysis</h1>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2">
        {promptSuggestions.map((s) => (
          <button
            key={s}
            onClick={() => chooseSuggestion(s)}
            className="px-3 py-1 bg-violet-50 text-violet-500 rounded-full text-sm hover:bg-violet-200"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Custom prompt form */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          className="w-full p-2 border rounded-md ring-0 focus:ring-0 focus:border-none"
          rows={3}
          placeholder="Or type your own question..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          type="submit"
          disabled={mutation.isPending}
        >
          Analyze
        </Button>
      </form>

      {/* Loading state */}
      {mutation.isPending && (
        <div className="py-4">
          <GenericLoader />
        </div>
      )}

      {/* Response */}
      {finalText && (
        <div className="prose bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
          <div dangerouslySetInnerHTML={{ __html: finalText }} />
        </div>
      )}
    </div>
  );
}
