import {Hono} from 'hono'

import donationAlerts from "@/donation-alerts";
import termsOfService from "@/terms-of-service";

const app = new Hono()
app.get('/', (ctx) => ctx.redirect("https://aniby.net/"));
app.route("/da", donationAlerts);
app.route("/", termsOfService);

export default {
    port: 3001,
    fetch: app.fetch,
}
