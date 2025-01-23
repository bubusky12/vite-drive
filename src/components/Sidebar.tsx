import React from "react";
import { List, ListItemButton, ListItemText, ListItemIcon, Box } from "@mui/material";

interface SidebarItem {
  text: string;
  icon: string;
}

const Sidebar: React.FC = () => {
  const daftarItems: SidebarItem[] = [
    { text: "Drive Saya", icon: "http://agtest.agakcw.my.id/gdrive.png" },
    { text: "Berbagi Drive", icon: "http://agtest.agakcw.my.id/file-sharing.png" },
    { text: "Sampah", icon: "http://agtest.agakcw.my.id/trash-can.png" },
    { text: "Penggunaan Storage", icon: "http://agtest.agakcw.my.id/trash-can.png" },
    { text: "Favorite", icon: "http://agtest.agakcw.my.id/pngegg%20%281%29.png" },
  ];

  return (
    <Box
      sx={{
        width: "240px", // Lebar sidebar
        height: "100vh", // Sidebar sepanjang layar
        backgroundColor: "#1976d2", // Warna biru Material-UI
        color: "white", // Warna teks putih
        padding: "16px", // Padding untuk memberi jarak
      }}
    >
      <List>
        {daftarItems.map((item, index) => (
          <ListItemButton key={index}>
            {/* Icon (image) */}
            <ListItemIcon>
              <img
                src={item.icon}
                alt={`${item.text} icon`}
                style={{ width: 24, height: 24 }}
              />
            </ListItemIcon>

            {/* Text */}
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
