import { useState, useCallback } from "react";
import { Box, Button } from "@mui/material";
import { RecordForm } from "./components/Form";
import { RecordsTable } from "./components/Table";
import { Layout } from "./components/Layout";
import { Modal } from "./components/Modal";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFormSuccess = useCallback(() => {
    setShowForm(false);
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  return (
    <Layout>
      <RecordsTable refreshTrigger={refreshTrigger} />

      <Modal open={showForm} onClose={() => setShowForm(false)}>
        <RecordForm onSuccess={handleFormSuccess} />
      </Modal>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={() => setShowForm(true)}
          sx={{
            px: 3,
            py: 1,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          Добавить пользователя
        </Button>
      </Box>
    </Layout>
  );
}

export default App;
