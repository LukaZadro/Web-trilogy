import Footer from "@/components/Footer";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  const validate = () => {
    if (!firstName || !lastName) return "Ime i prezime su obavezni.";
    if (!email) return "Email je obavezan.";
    if (password.length < 6) return "Lozinka mora imati najmanje 6 znakova.";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    try {
      const res = await fetch(`${"http://localhost:3001"}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // include credentials if your backend sets cookies (session auth)
        // credentials: "include",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // backend should return { message: "..." } or validation errors
        throw new Error(data?.message || "Neuspjela registracija");
      }

      // success: navigate to login or previous page
      setLoading(false);
      navigate("/prijava"); // or "/login"
    } catch (err) {
      setLoading(false);
      setError(err?.message || "Greška pri registraciji.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-20 items-center justify-center w-full">
      <div className="w-[95%] md:w-[40%] mx-auto mt-20 p-6 bg-card/80 rounded-md shadow">
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <img src="/logo_header.png" className="w-[100px] h-[100px]" />
          <h1 className="text-2xl font-semibold mb-4">Registracija</h1>
          {error && <div className="mb-4 text-red-500">{error}</div>}
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Ime</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Ivan"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Prezime</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Ivić"
              />
            </div>
          </div>

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
            <label className="block text-sm mb-1">Uloga</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-white"
            >
              <option value="">Odaberite ulogu</option>
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
              <option value="poslodavac">Poslodavac</option>
              <option value="udruga">Udruga</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
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
            <div>
              <label className="block text-sm mb-1">Potvrdi lozinku</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Ponovite lozinku"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Registracija..." : "Registriraj se"}
          </button>
        </form>

        <p className="mt-4 text-sm">
          Već imate račun?{" "}
          <Link to="/login" className="text-primary font-medium">
            Prijavite se
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Registration;
