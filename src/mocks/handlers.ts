import { rest } from "msw";
import type { Record } from "../types";

const mockData: Record[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  age: 20 + (index % 40),
  profession: `Profession ${index + 1}`,
  wages: 30000 + index * 1000,
}));

export const handlers = [
  rest.get("/api/users", (req, res, ctx) => {
    const start = Number(req.url.searchParams.get("_start")) || 0;
    const limit = Number(req.url.searchParams.get("_limit")) || 10;
    const data = mockData.slice(start, start + limit);

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.post("/api/users", async (req, res, ctx) => {
    const body = await req.json() as Record;
    return res(
      ctx.status(201),
      ctx.json({ ...body, id: mockData.length + 1 })
    );
  }),
];
