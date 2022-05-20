import Fastify from "fastify";

import { mainHandlers } from "./endpoints/main";

export const app = Fastify({ logger: true });

app.register(mainHandlers);
