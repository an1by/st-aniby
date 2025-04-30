import {createRoute} from "@hono/zod-openapi";
import AccessToken from "#/types/donation-alerts/token/access-token.ts";
import {AdvancedUserSettingsSchema} from "#/types/donation-alerts/user";

const category = createRoute({
    method: 'get',
    path: '/v1/advusersettings',
    tags: ["User"],
    request: {
        headers: AccessToken.dashboard.headers,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: AdvancedUserSettingsSchema,
                },
            },
            description: 'Retrieve the advanced user settings',
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
