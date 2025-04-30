import {OpenAPIHono} from "@hono/zod-openapi";
import widget from "@da/user/widget.ts";

const hono = new OpenAPIHono();
hono.openapi(widget.route, widget.handler);

export default hono;
