import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { RecordForm } from "../components/Form";
import { server } from "../mocks/server";

describe("RecordForm", () => {
  const mockOnSuccess = jest.fn();

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    mockOnSuccess.mockClear();
  });

  afterAll(() => {
    server.close();
  });

  it("renders all form fields", () => {
    render(<RecordForm onSuccess={mockOnSuccess} />);

    expect(screen.getByLabelText(/имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/почта/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/возраст/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/профессия/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/заработная плата/i)).toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    render(<RecordForm onSuccess={mockOnSuccess} />);

    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /отправить/i }));
    });

    await waitFor(() => {
      expect(screen.getByText("Имя обязательно для заполнения")).toBeInTheDocument();
      expect(screen.getByText("Email обязателен для заполнения")).toBeInTheDocument();
      expect(screen.getByText("Возраст обязателен для заполнения")).toBeInTheDocument();
      expect(screen.getByText("Профессия обязательна для заполнения")).toBeInTheDocument();
      expect(screen.getByText("Заработная плата обязательна для заполнения")).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it("shows validation errors for invalid data", async () => {
    render(<RecordForm onSuccess={mockOnSuccess} />);

    await act(async () => {
      await userEvent.type(screen.getByLabelText(/имя/i), "A");
      await userEvent.type(screen.getByLabelText(/почта/i), "invalid-email");
      await userEvent.type(screen.getByLabelText(/возраст/i), "15");
      await userEvent.type(screen.getByLabelText(/заработная плата/i), "-1000");
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /отправить/i }));
    });

    await waitFor(() => {
      expect(screen.getByText("Имя должно содержать минимум 2 символа")).toBeInTheDocument();
      expect(screen.getByText("Введите корректный email")).toBeInTheDocument();
      expect(screen.getByText("Возраст должен быть от 18 до 100 лет")).toBeInTheDocument();
      expect(screen.getByText("Заработная плата не может быть отрицательной")).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it("successfully submits form with valid data", async () => {
    render(<RecordForm onSuccess={mockOnSuccess} />);

    await act(async () => {
      await userEvent.type(screen.getByLabelText(/имя/i), "John Doe");
      await userEvent.type(screen.getByLabelText(/почта/i), "john@example.com");
      await userEvent.type(screen.getByLabelText(/возраст/i), "30");
      await userEvent.type(screen.getByLabelText(/профессия/i), "Developer");
      await userEvent.type(screen.getByLabelText(/заработная плата/i), "50000");
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /отправить/i }));
    });

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    }, { timeout: 5000 });
  });
});
