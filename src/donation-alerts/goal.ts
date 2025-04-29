import {HttpRouter} from "#/utils/http-router.ts";
import {allowOriginResponseInit} from "#/utils/response-utils.ts";

const router = new HttpRouter("/da/goal", {
    "/info": async (req) => {
        const {searchParams} = new URL(req.url)
        if (!searchParams.has("accessToken")) {
            return new Response("Authorization token not found", {status: 401});
        }
        const token = searchParams.get("accessToken")!;

        if (!searchParams.has("id")) {
            return new Response("Goal id not found", {status: 401});
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
            return new Response(JSON.stringify(result), allowOriginResponseInit);
        } catch (error) {
            return new Response("DonationAlerts Error", {status: 400});
        }
    },
});

export default router;
