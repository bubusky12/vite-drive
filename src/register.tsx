import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./components/Layout";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [cooldown, setCooldown] = useState<number>(0); // State untuk cooldown
  const navigate = useNavigate();

  // Efek untuk mengurangi cooldown setiap detik
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Fungsi untuk mengirim kode verifikasi
  const handleSendCode = async () => {
    if (!email) {
      setError("Email tidak boleh kosong");
      return;
    }

    // Mulai cooldown sebelum mengirim request
    setCooldown(60);
    setError("");
    setSuccess("");

    try {
      await axios.post("/api/auth/sendCode", { email });
      setSuccess("Kode verifikasi telah dikirim ke email");
    } catch (error) {
      setError("Gagal mengirim kode verifikasi");
      setCooldown(0); // Reset cooldown jika gagal
    }
  };

  // Fungsi submit form registrasi
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("/api/auth/register", {
        name,
        email,
        password,
        verificationCode,
      });

      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registrasi gagal");
    }
  };

  return (
    <Layout title="Register">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-700">Daftar Akun</h2>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          {success && <p className="text-sm text-green-500 text-center">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={cooldown > 0}
                  className={`px-4 py-2 text-white rounded-r-lg focus:outline-none ${
                    cooldown > 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {cooldown > 0 ? `Cooldown ${cooldown}s` : "Kirim Kode"}
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Kode Verifikasi</label>
              <input
                type="text"
                placeholder="Masukkan kode verifikasi"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Daftar
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Sudah punya akun?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Masuk
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
