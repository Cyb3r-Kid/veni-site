import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginWithEmailPassword } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/ToastProvider";

function Login() {
  const navigate = useNavigate();
  const { isAdmin, loading } = useAuth();
  const { pushToast } = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!loading && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      setSubmitting(true);
      await loginWithEmailPassword(form.email.trim(), form.password);
      pushToast({ title: "Logged in successfully." });
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to sign in.");
      pushToast({ title: err.message || "Unable to sign in.", tone: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/95 p-8 shadow-2xl"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600">Admin Access</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Sign in</h1>
        <p className="mt-3 text-sm text-slate-600">Use your Firebase Authentication email and password to access the CMS dashboard.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Admin email"
            className="w-full rounded-2xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full rounded-2xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
