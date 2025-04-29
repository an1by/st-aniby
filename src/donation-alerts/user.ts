import {HttpRouter} from "#/utils/http-router.ts";
import {allowOriginResponseInit} from "#/utils/response-utils.ts";

const router = new HttpRouter("/da/user", {
    "/widget": async (req) => {
        const {searchParams} = new URL(req.url)
        if (!searchParams.has("accessToken")) {
            return new Response("Authorization token not found", {status: 401});
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
            return new Response(JSON.stringify(result), allowOriginResponseInit);
        } catch (error) {
            return new Response("DonationAlerts Error", {status: 400});
        }
    },
});

export default router;
