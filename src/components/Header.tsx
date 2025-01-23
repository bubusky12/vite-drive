import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, InputBase, Avatar, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface UserSession {
  user: {
    name: string;
    image: string;
  };
}

const Header: React.FC<{ session: UserSession | null }> = ({ session }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar position="static" style={{ background: "#fff", color: "#000000" }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Drive Saya
        </Typography>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            marginRight: "20px",
          }}
        >
          <SearchIcon />
          <InputBase placeholder="Search" style={{ marginLeft: "10px" }} />
        </div>
        <Avatar
          alt={session?.user?.name || "User"}
          src={session?.user?.image || "http://agtest.agakcw.my.id/aga.png"}
        />
        <div style={{ marginLeft: "15px", display: "flex", alignItems: "center" }}>
          {session ? (
            <>
              <span style={{ marginRight: "10px" }}>{session.user.name}</span>
              <Button
                onClick={handleSignOut}
                variant="contained"
                style={{
                  backgroundColor: "red",
                  color: "#fff",
                  textTransform: "none",
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              variant="text"
              style={{ color: "#000000", textTransform: "none" }}
            >
              Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
