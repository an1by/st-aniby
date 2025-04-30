import {createRoute} from "@hono/zod-openapi";
import {UserExtendedSchema, UserSchema} from "#/types/donation-alerts/user";
import AccessToken from "#/types/donation-alerts/token/access-token.ts";
import {z} from "zod";
import {CurrencySchema} from "#/types/donation-alerts/currency.ts";

const root = createRoute({
    method: 'get',
    path: '/v1/currencies',
    tags: ["General"],
    request: {
        headers: AccessToken.dashboard.headers,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        data: z.array(CurrencySchema)
                    }),
                },
            },
            description: 'Retrieve available currencies',
        }
    },
});

export default {root};
