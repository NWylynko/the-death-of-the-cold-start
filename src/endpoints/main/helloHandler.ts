import { RouteHandler } from "fastify";
import { hello } from "../../functions/hello";

// all query parameters are potentially undefined
// so always need to have a default or handle any of the query parameters being undefined
type Query = Partial<{
  name: string;
}>;

export const helloHandler: RouteHandler<{ Querystring: Query }> = async (request) => {
  const { name } = request.query;

  const result = await hello(name ?? "world");

  return { result };
};
