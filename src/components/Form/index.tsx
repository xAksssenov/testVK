import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import type { FormErrors, FormProps, Record } from "../../types";
import { formStyles } from "./styles";
import { validateField, validateForm } from "../../utils/validation";

export const RecordForm: React.FC<FormProps> = ({ fields, onSuccess }) => {
  const [formData, setFormData] = useState<Record>(() => {
    const initialData: Record = {};
    fields.forEach((field) => {
      initialData[field.name] = field.type === "number" ? 0 : "";
    });
    return initialData;
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    const field = fields.find((f) => f.name === name);
    if (field) {
      const error = validateField(field, newValue);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateForm(
      fields,
      formData
    );
    if (!isValid) {
      setErrors(validationErrors);
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
        const initialData: Record = {};
        fields.forEach((field) => {
          initialData[field.name] = field.type === "number" ? 0 : "";
        });
        setFormData(initialData);
        onSuccess?.();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" sx={formStyles.form} onSubmit={handleSubmit}>
      {fields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          value={formData[field.name] || ""}
          onChange={handleChange}
          error={!!errors[field.name]}
          helperText={errors[field.name]}
          disabled={isSubmitting}
          inputProps={{
            min: field.validation?.min,
            max: field.validation?.max,
          }}
        />
      ))}
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
