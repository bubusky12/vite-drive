import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FolderIcon from "@mui/icons-material/Folder";

interface File {
  id: string;
  name: string;
  type: string;
  modified: string;
  users: number;
  size: string;
}

const FileList: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">("info");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const API_URL = "http://localhost:5000/api/files";

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get(API_URL);
        if (Array.isArray(res.data)) {
            setFiles(res.data); 
        } else {
            console.error("Respon:", res.data);
        }
      } catch (err) {
        console.error("Error fetch file:", err);
      }
    };

    fetchFiles();
  }, []);

  const handleAddFolder = async () => {
    if (newFolderName.trim()) {
      try {
        const res = await axios.post(API_URL, {
          name: newFolderName,
          type: "folder",
          modified: new Date().toLocaleString(),
          users: 0,
          size: "-",
        });
        setFiles([...files, res.data]);
        setNewFolderName("");
        setSnackbarMessage("Folder berhasil ditambahkan");
        setSnackbarSeverity("success");
        setShowSnackbar(true);
      } catch (err) {
        console.error("Error menambahkan folder:", err);
        setSnackbarMessage("Gagal menambahkan folder");
        setSnackbarSeverity("error");
        setShowSnackbar(true);
      }
    } else {
      setSnackbarMessage("Nama folder tidak boleh kosong");
      setSnackbarSeverity("warning");
      setShowSnackbar(true);
    }
  };

  const confirmDelete = (id: string) => {
    setSelectedFileId(id);
    setOpenModal(true);
  };

  const handleDelete = async () => {
    try {
      if (selectedFileId) {
        await axios.delete(`/api/files?id=${selectedFileId}`);
        setFiles(files.filter((file) => file.id !== selectedFileId));
        setSnackbarMessage("File berhasil dihapus");
        setSnackbarSeverity("success");
        setShowSnackbar(true);
      }
    } catch (error) {
      console.error("Error saat menghapus file:", error);
      setSnackbarMessage("Gagal menghapus file");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    } finally {
      setOpenModal(false);
      setSelectedFileId(null);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", padding: "20px" }}>
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
        <TextField
          label="Nama Folder"
          variant="outlined"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          style={{ flex: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddFolder}>
          Tambah Folder
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Modified On</TableCell>
              <TableCell>Users</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  {file.type === "folder" ? (
                    <FolderIcon style={{ marginRight: 8, color: "orange" }} />
                  ) : (
                    <InsertDriveFileIcon style={{ marginRight: 8, color: "blue" }} />
                  )}
                  {file.name}
                </TableCell>
                <TableCell>{file.modified}</TableCell>
                <TableCell>{file.users > 0 ? file.users : "No Users"}</TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => confirmDelete(file.id)}
                  >
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus file/folder ini? Tindakan ini tidak dapat dibatalkan.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenModal(false)} color="primary">
            Batal
          </Button>
          <Button variant="contained" onClick={handleDelete} color="error">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={showSnackbar} autoHideDuration={5000} onClose={() => setShowSnackbar(false)}>
        <Alert severity={snackbarSeverity} onClose={() => setShowSnackbar(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FileList;
