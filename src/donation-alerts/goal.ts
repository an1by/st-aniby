import {Hono} from "hono";

const hono = new Hono();
hono.get("/info", async (ctx) => {
    const {searchParams} = new URL(ctx.req.url)
    if (!searchParams.has("accessToken")) {
        ctx.status(401);
        return ctx.body("Authorization token not found");
    }
    const token = searchParams.get("accessToken")!;

    if (!searchParams.has("id")) {
        ctx.status(401);
        return ctx.body("Goal id not found");
    }
    const id = searchParams.get("id")!;

    try {
        const goalResponse = await fetch(
            `https://www.donationalerts.com/api/v1/donationgoal/${id}`,
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
