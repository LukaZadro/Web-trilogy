import Footer from "@/components/Footer";
import { UserContext } from "@/context/UserContext";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useContext(UserContext);

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
      const res = await fetch(`${"http://localhost:3001"}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (data?.error) {
        setError("Neispravni e-mail ili lozinka");
        setLoading(false);
        navigate("/login");
      } else {
        setLoading(false);
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/"); // nakon uspješne prijave redirect
      }
    } catch (err) {
      setLoading(false);
      setError(err?.message || "Greška pri prijavi.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-20 items-center justify-center w-full">
      <div className="w-[95%] md:w-[30%] mx-auto p-6 bg-card/80 rounded-md shadow">
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <img src="/logo_header.png" className="w-[100px] h-[100px]" />
          <h1 className="text-2xl font-semibold mb-4">Prijava</h1>
          {error && <div className="mb-4 text-red-500">{error}</div>}
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">E-mail</label>
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
      <Footer />
    </div>
  );
};

export default Login;
