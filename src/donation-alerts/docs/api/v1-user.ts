import {createRoute} from "@hono/zod-openapi";
import {UserExtendedSchema, UserSchema} from "#/types/donation-alerts/user";
import AccessToken from "#/types/donation-alerts/token/access-token.ts";

const root = createRoute({
    method: 'get',
    path: '/v1/user',
    tags: ["User"],
    request: {
        headers: AccessToken.dashboard.headers,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: UserExtendedSchema,
                },
            },
            description: 'Retrieve the extended user info',
        }
    },
});

const widget = createRoute({
    method: 'get',
    path: '/v1/user/widget',
    tags: ["User"],
    request: {
        headers: AccessToken.widget.headers,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: UserSchema,
                },
            },
            description: 'Retrieve the user info',
        }
    },
});

export default {root, widget};
