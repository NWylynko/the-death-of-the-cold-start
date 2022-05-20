import { FastifyPluginAsync } from "fastify";

import { helloHandler } from "./helloHandler";

export const mainHandlers: FastifyPluginAsync = async (app) => {
  app.get("/", helloHandler);
};
