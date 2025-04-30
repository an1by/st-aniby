import {serveStatic} from "hono/bun";
import {createRoute, OpenAPIHono} from "@hono/zod-openapi";
import {z} from "zod";
import {ScopeQuery} from "#/types/donation-alerts";
import {BadRequestResponse} from "#/types/errors.ts";

const hono = new OpenAPIHono();

const route = createRoute({
    method: 'get',
    path: '/',
    tags: ["DonationAlerts"],
    description: `Request to 
        \`https://www.donationalerts.com/oauth/authorize\` 
        via data from \`.env\``,
    request: {
        query: z.object({
            ...ScopeQuery,
        }),
    },
    responses: {
        301: {
            description: 'Redirect to \`donationalerts.com/oauth\`',
        },
        ...BadRequestResponse,
    },
});

hono.openapi(route, (ctx) => {
    const {searchParams} = new URL(ctx.req.url)
    if (!searchParams.has("scope")) {
        return ctx.json({message: "Scope not found"}, 401);
    }
    const scope = searchParams.get("scope")!;

    const url = `https://www.donationalerts.com/oauth/authorize?client_id=${Bun.env.DA_APP_ID}&redirect_uri=${Bun.env.HOST}/oauth/confirm&response_type=token&scope=${scope}`;
    return ctx.redirect(url);
})
hono.get("/confirm", serveStatic({path: "./assets/da/confirm.html"}))

export default hono;
