import {Hono} from "hono";
import {serveStatic} from "hono/bun";

const hono = new Hono();
hono.get("/terms-of-service", serveStatic({path: "./assets/terms-of-service.html"}))
hono.get("/tos", (c) => c.redirect("/terms-of-service"));
export default hono;
