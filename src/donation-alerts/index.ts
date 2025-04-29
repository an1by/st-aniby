import {HttpRouter} from "#/utils/http-router.ts";
import oauth from "@da/oauth.ts";
import goal from "@da/goal.ts";
import user from "@da/user.ts";

const router = new HttpRouter("/da", {
    "/goal": goal,
    "/oauth": oauth,
    "/user": user
});

export default router;
