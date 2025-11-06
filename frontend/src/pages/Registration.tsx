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
      // TODO: pozvati API za registraciju
      // primjer:
      // const res = await fetch("/api/auth/register", { method: "POST", body: JSON.stringify({ firstName, lastName, email, password }) })
      // if (!res.ok) throw new Error("Neuspjela registracija");

      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 800);
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || "Greška pri registraciji.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-card/80 rounded-md shadow">
      <h1 className="text-2xl font-semibold mb-4">Registracija</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
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
        <option value="studentska_organizacija">Studentska organizacija</option>
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
  );
};

export default Registration;

