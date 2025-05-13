import {type Context} from "hono";
import {createRoute} from "@hono/zod-openapi";
import {z} from "zod";
import {BadRequestResponse, ExternalErrorResponse} from "#/types/errors.ts";
import {UserSchema} from "#/types/donation-alerts/user";
import {DonationAlertsAccessTokenError, DonationAlertsThrowableError} from "#/errors/donation-alerts.ts";
import AccessToken from "#/types/donation-alerts/token/access-token.ts";

const route = createRoute({
    method: 'get',
    path: '/widget',
    tags: ["DonationAlerts"],
    description: `Request to 
        \`https://www.donationalerts.com/api/v1/user/widget\` 
        with 
        \`Authorization: Bearer <accessToken>\` 
        header`,
    request: {
        query: z.object({
            ...AccessToken.dashboard.query,
        }),
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: UserSchema,
                },
            },
            description: 'Retrieve the user info',
        },
        ...ExternalErrorResponse,
        ...BadRequestResponse,
    },
});

const handler = async (ctx: Context) => {
    const {searchParams} = new URL(ctx.req.url)
    if (!searchParams.has("accessToken")) {
        return DonationAlertsAccessTokenError(ctx);
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
        const user = UserSchema.parse(result);
        return ctx.json(user, 200);
    } catch (error) {
        return DonationAlertsThrowableError(ctx, error);
    }
};
export default {route, handler};
