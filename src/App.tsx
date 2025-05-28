import { useState, useCallback } from "react";
import { Box, Button } from "@mui/material";
import { RecordForm } from "./components/Form";
import { RecordsTable } from "./components/Table";
import { Layout } from "./components/Layout";
import { Modal } from "./components/Modal";
import type { FormField } from "./types";

const formFields: FormField[] = [
  {
    name: "name",
    label: "Имя",
    type: "text",
    validation: {
      required: true,
      minLength: 2,
      message: "Имя должно содержать минимум 2 символа",
    },
  },
  {
    name: "email",
    label: "Почта",
    type: "email",
    validation: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Введите корректный email",
    },
  },
  {
    name: "age",
    label: "Возраст",
    type: "number",
    validation: {
      required: true,
      min: 18,
      max: 100,
      message: "Возраст должен быть от 18 до 100 лет",
    },
  },
  {
    name: "profession",
    label: "Профессия",
    type: "text",
    validation: {
      required: true,
    },
  },
  {
    name: "wages",
    label: "Заработная плата",
    type: "number",
    validation: {
      required: true,
      min: 0,
      message: "Заработная плата не может быть отрицательной",
    },
  },
];

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
        <RecordForm fields={formFields} onSuccess={handleFormSuccess} />
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
