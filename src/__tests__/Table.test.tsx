import { render, screen, waitFor, act } from "@testing-library/react";
import { RecordsTable } from "../components/Table";
import { server } from "../mocks/server";
import { rest } from "msw";

describe("RecordsTable", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("shows loading state initially", async () => {
    server.use(
      rest.get("/api/users", async (req, res, ctx) => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return res(
          ctx.json([
            {
              id: 1,
              name: "User 1",
              email: "user1@example.com",
              age: 20,
              profession: "Profession 1",
              wages: 30000,
            },
            {
              id: 2,
              name: "User 2",
              email: "user2@example.com",
              age: 21,
              profession: "Profession 2",
              wages: 35000,
            },
          ])
        );
      })
    );

    render(<RecordsTable />);

    const progressbar = await screen.findByRole("progressbar");
    expect(progressbar).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });

  it("loads and displays data", async () => {
    await act(async () => {
      render(<RecordsTable />);
    });

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

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
    });

    await waitFor(() => {
      const cells = screen.getAllByRole("cell");
      expect(cells.length).toBeGreaterThan(0);
    });
  });

  it("refreshes data when trigger changes", async () => {
    let rerender: (ui: React.ReactElement) => void;
    await act(async () => {
      const result = render(<RecordsTable refreshTrigger={0} />);
      rerender = result.rerender;
    });

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    const initialCells = await screen.findAllByRole("cell");
    const initialCount = initialCells.length;

    await act(async () => {
      rerender(<RecordsTable refreshTrigger={1} />);
    });

    await waitFor(() => {
      const newCells = screen.getAllByRole("cell");
      expect(newCells.length).toBe(initialCount);
    });
  });
});
