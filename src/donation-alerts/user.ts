
import {Hono} from "hono";

const hono = new Hono();
hono.get("/widget", async (ctx) => {
    const {searchParams} = new URL(ctx.req.url)
    if (!searchParams.has("accessToken")) {
        ctx.status(401);
        return ctx.body("Authorization token not found");
    }
    const token = searchParams.get("accessToken")!;

    try {
        const goalResponse = await fetch(
            `https://www.donationalerts.com/api/v1/user/widget`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        const result = await goalResponse.json();
        ctx.header("Access-Control-Allow-Origin", "*");
        return ctx.json(result);
    } catch (error) {
        ctx.status(400);
        return ctx.body("DonationAlerts Error");
    }
});
export default hono;
