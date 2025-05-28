import { render, screen, fireEvent, act } from "@testing-library/react";
import { RecordForm } from "../components/Form";
import type { FormField } from "../types";

const mockOnSuccess = jest.fn();

const testFields: FormField[] = [
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

describe("RecordForm", () => {
  beforeEach(() => {
    mockOnSuccess.mockClear();
  });

  it("renders all form fields", () => {
    render(<RecordForm fields={testFields} onSuccess={mockOnSuccess} />);

    expect(screen.getByLabelText(/имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/почта/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/возраст/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/профессия/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/заработная плата/i)).toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    render(<RecordForm fields={testFields} onSuccess={mockOnSuccess} />);

    await act(async () => {
      fireEvent.click(screen.getByText(/отправить/i));
    });

    expect(
      screen.getByText("Имя обязательно для заполнения")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Email обязателен для заполнения")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Возраст обязателен для заполнения")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Профессия обязательна для заполнения")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Заработная плата обязательна для заполнения")
    ).toBeInTheDocument();
  });

  it("shows validation errors for invalid input", async () => {
    render(<RecordForm fields={testFields} onSuccess={mockOnSuccess} />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/имя/i), {
        target: { value: "a" },
      });
      fireEvent.change(screen.getByLabelText(/почта/i), {
        target: { value: "invalid-email" },
      });
      fireEvent.change(screen.getByLabelText(/возраст/i), {
        target: { value: "15" },
      });
      fireEvent.change(screen.getByLabelText(/заработная плата/i), {
        target: { value: "-100" },
      });
      fireEvent.click(screen.getByText(/отправить/i));
    });

    expect(
      screen.getByText("Имя должно содержать минимум 2 символа")
    ).toBeInTheDocument();
    expect(screen.getByText("Введите корректный email")).toBeInTheDocument();
    expect(
      screen.getByText("Возраст должен быть от 18 до 100 лет")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Заработная плата не может быть отрицательной")
    ).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(<RecordForm fields={testFields} onSuccess={mockOnSuccess} />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/имя/i), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByLabelText(/почта/i), {
        target: { value: "john@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/возраст/i), {
        target: { value: "25" },
      });
      fireEvent.change(screen.getByLabelText(/профессия/i), {
        target: { value: "Developer" },
      });
      fireEvent.change(screen.getByLabelText(/заработная плата/i), {
        target: { value: "100000" },
      });
      fireEvent.click(screen.getByText(/отправить/i));
    });

    expect(
      screen.queryByText("Имя обязательно для заполнения")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Email обязателен для заполнения")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Возраст обязателен для заполнения")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Профессия обязательна для заполнения")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Заработная плата обязательна для заполнения")
    ).not.toBeInTheDocument();
  });
});
