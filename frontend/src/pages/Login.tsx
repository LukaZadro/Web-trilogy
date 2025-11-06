import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email) return "Email je obavezan.";
    if (!password) return "Lozinka je obavezna.";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    try {
      // TODO: pozovi API ovdje (fetch/axios)
      // primjer:
      // const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) })
      // if (!res.ok) throw new Error("Neuspjela prijava");

      // privremeno simuliraj uspjeh
      setTimeout(() => {
        setLoading(false);
        navigate("/"); // nakon uspješne prijave redirect
      }, 700);
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || "Greška pri prijavi.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-32 p-6 bg-card/80 rounded-md shadow">
      <h1 className="text-2xl font-semibold mb-4">Prijava</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="primjer@domena.hr"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Lozinka</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Lozinka"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="form-checkbox" />
            Zapamti me
          </label>
          <Link to="/forgot" className="text-sm text-primary">
            Zaboravili ste lozinku?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Prijavljivanje..." : "Prijavi se"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Nemate račun?{" "}
        <Link to="/register" className="text-primary font-medium">
          Registrirajte se
        </Link>
      </p>
    </div>
  );
};

export default Login;

