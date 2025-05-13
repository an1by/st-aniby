import {z} from "zod";
import {createRoute} from "@hono/zod-openapi";
import {GoalIdQuery} from "#/types/donation-alerts/goal";
import {GoalInfoSchema} from "#/types/donation-alerts/goal/info.ts";
import {BadRequestResponse, ExternalErrorResponse} from "#/types/errors.ts";
import type {Context} from "hono";
import {DonationAlertsAccessTokenError, DonationAlertsThrowableError} from "#/errors/donation-alerts.ts";
import AccessToken from "#/types/donation-alerts/token/access-token.ts";

const route = createRoute({
    method: 'get',
    path: '/info',
    tags: ["DonationAlerts"],
    description: `Request to 
        \`https://www.donationalerts.com/api/v1/donationgoal/<id>\` 
        with 
        \`Authorization: Bearer <accessToken>\` 
        header`,
    request: {
        query: z.object({
            ...GoalIdQuery,
            ...AccessToken.dashboard.query,
        }),
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: GoalInfoSchema,
                },
            },
            description: 'Retrieve the goal info',
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

    if (!searchParams.has("id")) {
        return ctx.json({message: "Goal id not found"}, 401);
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
        const goal = GoalInfoSchema.parse(result);
        return ctx.json(goal, 200);
    } catch (error) {
        return DonationAlertsThrowableError(ctx, error);
    }
};


export default {route, handler};
