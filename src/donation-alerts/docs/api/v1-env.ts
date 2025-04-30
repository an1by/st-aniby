import {createRoute} from "@hono/zod-openapi";

const front = createRoute({
    method: 'get',
    path: '/v1/env/front',
    tags: ["General"],
    description: 'Frontend environment',
    responses: {
        200: {
            description: 'Retrieve the frontend environment',
        }
    },
});

export default {front};
