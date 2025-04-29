import donationAlertsRouter from "@/donation-alerts";
import termsOfService from "@/pages/terms-of-service.html";

Bun.serve({
    port: 3001,
    routes: {
        "/": () => {
            return Response.redirect("https://aniby.net/", 301);
        },
        "/da/*": donationAlertsRouter.route,
        "/terms-of-service": termsOfService,
    },

    fetch(req) {
        return new Response("Not Found", {status: 404});
    },
});
