import {createRoute} from "@hono/zod-openapi";
import {z} from "zod";
import UserToken from "#/types/donation-alerts/token/user-token.ts";
import AccessToken from "#/types/donation-alerts/token/access-token.ts";

const widget = createRoute({
    method: 'get',
    path: '/v1/token/widget',
    tags: ["General"],
    request: {
        query: z.object({
            token: UserToken.zod
        }),
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        data: z.object({
                            token: AccessToken.widget.zod
                        })
                    }),
                },
            },
            description: 'Retrieve the user access token',
        }
    },
});

export default {widget};
