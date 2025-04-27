Bun.serve({
    port: 3001,
    routes: {
        // Static routes
        "/": req => {
            return Response.redirect("https://aniby.net/", 301);
        },

        "/terms-of-service": req => {
            return new Response(Bun.file("./src/pages/terms-of-service.html"));
        },

        // Per-HTTP method handlers
        "/api/posts": {
            GET: () => new Response("List posts"),
            POST: async req => {
                const body = await req.json();
                return Response.json({ created: true, ...body });
            },
        },
    },

    // (optional) fallback for unmatched routes:
    // Required if Bun's version < 1.2.3
    fetch(req) {
        return new Response("Not Found", { status: 404 });
    },
});
