"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("パスワードが違います");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-lapupu-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-light text-lapupu-brown tracking-[0.3em] mb-2">
            LAPUPU
          </h1>
          <p className="text-xs text-lapupu-brown-light/60 tracking-widest">ADMIN PANEL</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm">
          <label className="block text-xs text-lapupu-brown tracking-[0.2em] mb-3 uppercase">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-lapupu-brown transition-colors"
            placeholder="管理パスワードを入力"
            required
          />

          {error && (
            <p className="text-red-500 text-xs mt-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-lapupu-brown text-white py-3 rounded-full text-sm tracking-[0.2em] hover:bg-lapupu-brown-dark transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? "確認中..." : "ログイン"}
          </button>
        </form>

        <p className="text-center text-xs text-lapupu-brown/30 mt-6 tracking-wider">
          Lapupu Management System
        </p>
      </div>
    </div>
  );
}
