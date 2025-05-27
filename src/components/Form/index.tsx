import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

export const RecordForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
    profession: "",
    wages: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" || name === "wages" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        console.log("Успешно", formData);
        setFormData({
          name: "",
          email: "",
          age: 0,
          profession: "",
          wages: 0,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component="form"
      sx={{ display: "grid", gap: 2 }}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Имя"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        label="Почта"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        label="Возраст"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
      />
      <TextField
        label="Профессия"
        name="profession"
        value={formData.profession}
        onChange={handleChange}
      />
      <TextField
        label="Заработная плата"
        name="wages"
        type="number"
        value={formData.wages}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained">
        Отправить
      </Button>
    </Box>
  );
};
