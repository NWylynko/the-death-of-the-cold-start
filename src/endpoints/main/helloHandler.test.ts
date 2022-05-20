import Fastify, { FastifyInstance, InjectOptions } from "fastify";
import { helloHandler } from "./helloHandler";

describe("hello handler", () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = Fastify();
  });

  afterEach(() => {
    app.close();
  });

  test("response with Hello bob", async () => {
    app.get("/", helloHandler);

    const request: InjectOptions = {
      method: "GET",
      url: "/",
      query: {
        name: "bob",
      },
    };

    const response = await app.inject(request);

    expect(response.json()).toStrictEqual({ result: { hello: "bob" } });
  });

  test("response with Hello world", async () => {
    app.get("/", helloHandler);

    const request: InjectOptions = {
      method: "GET",
      url: "/",
      query: {},
    };

    const response = await app.inject(request);

    expect(response.json()).toStrictEqual({ result: { hello: "world" } });
  });
});
