import {createRoute} from "@hono/zod-openapi";
import AccessToken from "#/types/donation-alerts/token/access-token.ts";
import {z} from "zod";
import {TopDonatorsSchema, TotalRaised} from "#/types/donation-alerts/statistics.ts";

const idZod = z.number().openapi({example: 1234567});

const createStat = (name: string, schema: z.ZodObject<any>) => createRoute({
    method: 'get',
    path: `/v1/widgets/stat/{${name}_id}/stat`,
    tags: ["Statistics"],
    request: {
        params: z.object({
            id: idZod
        }),
        headers: AccessToken.widget.headers,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema,
                },
            },
            description: 'Retrieve the statistic info',
        },
    },
});

const topDonators = createStat("top_donators", TopDonatorsSchema);
const totalRaised = createStat("total_raised", TotalRaised);

export default {topDonators, totalRaised}
