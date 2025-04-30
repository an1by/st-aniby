import {OpenAPIHono} from "@hono/zod-openapi";
import info from "@da/goal/info.ts";

const hono = new OpenAPIHono();
hono.openapi(info.route, info.handler);

export default hono;
