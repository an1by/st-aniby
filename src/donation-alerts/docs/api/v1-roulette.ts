import {createRoute} from "@hono/zod-openapi";
import AccessToken from "#/types/donation-alerts/token/access-token.ts";
import {z} from "zod";
import {CategorySchema} from "#/types/donation-alerts/roulette/category.ts";

const category = createRoute({
    method: 'get',
    path: '/v1/roulette/category',
    tags: ["Roulette"],
    request: {
        headers: AccessToken.dashboard.headers,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        data: z.array(CategorySchema)
                    }),
                },
            },
            description: 'Retrieve the extended user info',
        }
    },
});
/*
TODO:
/v1/roulette/settings
/v1/roulette/goal/settings
/v1/roulette/goal-widget
 */


export default {category}
