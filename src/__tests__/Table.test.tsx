import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { RecordsTable } from "../components/Table";
import { server } from "../mocks/server";

jest.useFakeTimers();

describe("RecordsTable", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  afterAll(() => {
    server.close();
  });

  it("shows loading state initially", () => {
    render(<RecordsTable />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("loads and displays data", async () => {
    render(<RecordsTable />);

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    }, { timeout: 5000 });

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(5);
    expect(headers[0]).toHaveTextContent("Имя");
    expect(headers[1]).toHaveTextContent("Почта");
    expect(headers[2]).toHaveTextContent("Возраст");
    expect(headers[3]).toHaveTextContent("Профессия");
    expect(headers[4]).toHaveTextContent("Заработная плата");

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows.length).toBeGreaterThan(1);
    }, { timeout: 5000 });

    await waitFor(() => {
      const cells = screen.getAllByRole("cell");
      expect(cells.length).toBeGreaterThan(0);
    }, { timeout: 5000 });
  });

  it("refreshes data when trigger changes", async () => {
    const { rerender } = render(<RecordsTable refreshTrigger={0} />);

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    }, { timeout: 5000 });

    const initialCells = await waitFor(() => screen.getAllByRole("cell"), { timeout: 5000 });
    const initialCount = initialCells.length;

    await act(async () => {
      rerender(<RecordsTable refreshTrigger={1} />);
    });

    await waitFor(() => {
      const newCells = screen.getAllByRole("cell");
      expect(newCells.length).toBe(initialCount);
    }, { timeout: 5000 });
  });
});
