import {HttpRouter} from "#/utils/http-router.ts";
import oauthPage from "@/pages/da/auth.html";

const router = new HttpRouter("/da/oauth", {
    "": async (req) => {
        const {searchParams} = new URL(req.url)
        if (!searchParams.has("scope")) {
            return new Response("Scopes not found", {status: 401});
        }
        const scope = searchParams.get("scope")!;

        const url = `https://www.donationalerts.com/oauth/authorize?client_id=${Bun.env.DA_APP_ID}
                &redirect_uri=${Bun.env.HOST}/oauth/confirm
                &response_type=token
                &scope=${scope}`;
        return Response.redirect(url, 301);
    },
    "/confirm": oauthPage,
});

export default router;
