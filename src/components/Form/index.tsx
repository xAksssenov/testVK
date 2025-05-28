import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import type { FormErrors, FormProps } from "../../types";
import { formStyles } from "./styles";

export const RecordForm: React.FC<FormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
    profession: "",
    wages: 0,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно для заполнения";
      isValid = false;
    } else if (formData.name.length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email обязателен для заполнения";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Введите корректный email";
      isValid = false;
    }

    if (!formData.age) {
      newErrors.age = "Возраст обязателен для заполнения";
      isValid = false;
    } else if (formData.age < 18 || formData.age > 100) {
      newErrors.age = "Возраст должен быть от 18 до 100 лет";
      isValid = false;
    }

    if (!formData.profession.trim()) {
      newErrors.profession = "Профессия обязательна для заполнения";
      isValid = false;
    }

    if (!formData.wages) {
      newErrors.wages = "Заработная плата обязательна для заполнения";
      isValid = false;
    } else if (formData.wages < 0) {
      newErrors.wages = "Заработная плата не может быть отрицательной";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === "age" || name === "wages" ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/users", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setFormData({
          name: "",
          email: "",
          age: 0,
          profession: "",
          wages: 0,
        });
        onSuccess?.();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      sx={formStyles.form}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Имя"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        disabled={isSubmitting}
      />
      <TextField
        label="Почта"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        disabled={isSubmitting}
      />
      <TextField
        label="Возраст"
        name="age"
        type="number"
        value={formData.age || ""}
        onChange={handleChange}
        error={!!errors.age}
        helperText={errors.age}
        disabled={isSubmitting}
        inputProps={{ min: 18, max: 100 }}
      />
      <TextField
        label="Профессия"
        name="profession"
        value={formData.profession}
        onChange={handleChange}
        error={!!errors.profession}
        helperText={errors.profession}
        disabled={isSubmitting}
      />
      <TextField
        label="Заработная плата"
        name="wages"
        type="number"
        value={formData.wages || ""}
        onChange={handleChange}
        error={!!errors.wages}
        helperText={errors.wages}
        disabled={isSubmitting}
        inputProps={{ min: 0 }}
      />
      <Button 
        type="submit" 
        variant="contained" 
        disabled={isSubmitting}
        sx={formStyles.submitButton}
      >
        {isSubmitting ? "Отправка..." : "Отправить"}
      </Button>
    </Box>
  );
};
