import type { FormField, FormErrors, Record } from "../types";

export const validateField = (
  field: FormField,
  value: any
): string | undefined => {
  const validation = field.validation;
  if (!validation) return undefined;

  if (
    validation.required &&
    (!value || (typeof value === "string" && !value.trim()))
  ) {
    if (field.name === "email") {
      return "Email обязателен для заполнения";
    } else if (field.name === "profession") {
      return "Профессия обязательна для заполнения";
    } else if (field.name === "wages") {
      return "Заработная плата обязательна для заполнения";
    } else if (field.name === "age") {
      return "Возраст обязателен для заполнения";
    } else {
      return "Имя обязательно для заполнения";
    }
  }

  if (field.type === "email" && typeof value === "string") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return validation.message || "Введите корректный email";
    }
  }

  if (field.type === "number" && typeof value === "number") {
    if (validation.min !== undefined && value < validation.min) {
      return (
        validation.message || `Значение должно быть не менее ${validation.min}`
      );
    }
    if (validation.max !== undefined && value > validation.max) {
      return (
        validation.message || `Значение должно быть не более ${validation.max}`
      );
    }
  }

  if (field.type === "text" && typeof value === "string") {
    if (validation.minLength && value.length < validation.minLength) {
      return (
        validation.message ||
        `Минимальная длина ${validation.minLength} символов`
      );
    }
    if (validation.pattern && !validation.pattern.test(value)) {
      return validation.message || "Значение не соответствует формату";
    }
  }

  return undefined;
};

export const validateForm = (
  fields: FormField[],
  formData: Record
): { isValid: boolean; errors: FormErrors } => {
  const errors: FormErrors = {};
  let isValid = true;

  fields.forEach((field) => {
    const error = validateField(field, formData[field.name]);
    if (error) {
      errors[field.name] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
};
