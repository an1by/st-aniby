import {Hono} from "hono";
import {serveStatic} from "hono/bun";

const hono = new Hono();
hono.get("/", (ctx) => {
    const {searchParams} = new URL(ctx.req.url)
    if (!searchParams.has("scope")) {
        ctx.status(401);
        return ctx.body("Scope not found");
    }
    const scope = searchParams.get("scope")!;

    const url = `https://www.donationalerts.com/oauth/authorize?client_id=${Bun.env.DA_APP_ID}&redirect_uri=${Bun.env.HOST}/oauth/confirm&response_type=token&scope=${scope}`;
    return ctx.redirect(url);
})
hono.get("/confirm", serveStatic({path: "./assets/da/confirm.html"}))

export default hono;
