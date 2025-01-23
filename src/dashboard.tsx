import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import File from "./components/File";
import Layout from "./components/Layout";

interface UserSession {
  user: {
    name: string;
    image: string;
  };
}

const Dashboard: React.FC = () => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true); // Tambahkan state loading
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect ke login jika token tidak ada
    } else {
      // Simulasi pengambilan data sesi
      setSession({
        user: {
          name: "John Doe",
          image: "http://agtest.agakcw.my.id/user.png",
        },
      });
    }
    setLoading(false); // Set loading selesai
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Anda belum login. Redirecting...</p>
      </div>
    );
  }

  return (
    <Layout title="Dashboard">
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Header session={session} />
          <div style={{ padding: "20px" }}>
            <File />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
