import {swaggerUI} from "@hono/swagger-ui";
import {OpenAPIHono} from "@hono/zod-openapi";
import api from "@da/docs/api";

const hono = new OpenAPIHono();

hono.route('/api', api)

hono.get(
    '/',
    swaggerUI({
        title: "Documentation st-aniby",
        url: '/docs/da/openapi',
    })
);

hono.doc('/openapi', {
    info: {
        title: 'DonationAlerts API',
        version: 'Extended',
    },
    servers: [
        {
            "url": "https://donationalerts.com"
        }
    ],
    openapi: '3.1.0',
});
export default hono;
