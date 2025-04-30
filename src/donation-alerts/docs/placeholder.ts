import type {Context} from "hono";

const placeholder = (ctx: Context) => ctx.body("404 Not Found", 404);

export default placeholder;
