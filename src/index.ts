import donationAlerts from "@/donation-alerts";
import {swaggerUI} from "@hono/swagger-ui";
import {OpenAPIHono} from "@hono/zod-openapi";
import donationAlertsExternalDocumentation from "src/donation-alerts/docs";
import {serveStatic} from "hono/bun";
import { cors } from 'hono/cors'

const app = new OpenAPIHono();

app.get("/", async (ctx) =>
    ctx.redirect("https://github.com/an1by/st-aniby", 301));

app.get("/tos", (ctx) => ctx.redirect("/terms-of-service"));
app.get("/terms-of-service", serveStatic({path: "./assets/terms-of-service.html"}));
app.get("/privacy-policy", serveStatic({path: "./assets/privacy-policy.html"}));

app.use(
    '/da/*',
    cors({
        origin: '*',
        allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
        credentials: false
    })
);

app.route("/da", donationAlerts);
app.route("/docs/da", donationAlertsExternalDocumentation);

app.get(
    '/docs',
    swaggerUI({
        title: "Documentation st-aniby",
        url: '/docs/openapi',
    })
);

// Filter to avoid getting OpenAPI generated json from /src/donation-alerts/docs/
app.get('/docs/openapi', async (ctx) => {
    const response = await app.request('/docs/openapi_');
    const data = await response.json();
    for (let key of Object.keys(data.paths)) {
        if (key.startsWith("/docs")) {
            delete data.paths[key];
        }
    }
    return ctx.json(data, 200);
});

app.doc('/docs/openapi_', {
    info: {
        title: 'st-aniby API',
        version: 'v1',
    },
    servers: [
        {
            "url": "https://st.aniby.net"
        }
    ],
    openapi: '3.1.0',
});


export default {
    port: 3001,
    fetch: app.fetch,
}
