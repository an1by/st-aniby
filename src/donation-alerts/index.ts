import oauth from "@da/oauth.ts";
import goal from "@da/goal.ts";
import user from "@da/user.ts";
import {Hono} from "hono";

const hono = new Hono();
hono.route("/goal", goal);
hono.route("/oauth", oauth);
hono.route("/user", user);

export default hono;
