import oauth from "@da/oauth";
import goal from "@da/goal";
import user from "@da/user";
import {OpenAPIHono} from "@hono/zod-openapi";
import {rateLimiter} from "hono-rate-limiter";
import {getConnInfo} from "hono/cloudflare-workers";

const hono = new OpenAPIHono();
hono.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-6",
    keyGenerator: (ctx) => getConnInfo(ctx).remote.address!
}))
hono.route("/goal", goal);
hono.route("/oauth", oauth);
hono.route("/user", user);

export default hono;
