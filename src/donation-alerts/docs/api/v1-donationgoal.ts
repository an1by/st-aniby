import {createRoute} from "@hono/zod-openapi";
import {z} from "zod";
import {GoalIdZod} from "#/types/donation-alerts/goal";
import {GoalInfoSchema} from "#/types/donation-alerts/goal/info.ts";
import AccessToken from "#/types/donation-alerts/token/access-token.ts";

const root = createRoute({
    method: 'get',
    path: '/v1/donationgoal/{id}',
    tags: ["Goals"],
    request: {
        params: z.object({
            id: GoalIdZod,
        }),
        headers: AccessToken.widget.headers,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: GoalInfoSchema,
                },
            },
            description: 'Retrieve the user access token',
        }
    },
});

export default {root};
