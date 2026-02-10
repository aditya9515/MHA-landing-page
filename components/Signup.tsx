'use client';

import { useState } from "react";

export default function FooterNewsletter() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {

    if (!email) {
      setMessage("Please enter an email");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
      } else {
        setMessage("Check your email for verification!");
        setEmail("");
      }

    } catch (error) {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-background text-foreground relative w-full pt-20 pb-10">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-effect mb-16 rounded-2xl p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                Join our community, and make help shape your AI.
              </h3>

              <p className="text-foreground/70 mb-6">
                find your companion ai.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="border-foreground/20 bg-background focus:ring-primary rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
                />

                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="bg-primary text-primary-foreground shadow-primary/20 hover:shadow-primary/30 rounded-lg px-6 py-3 font-medium shadow-lg transition"
                >
                  {loading ? "Sending..." : "Subscribe Now"}
                </button>
              </div>

              {message && (
                <p className="mt-3 text-sm">{message}</p>
              )}

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}