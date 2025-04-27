Bun.serve({
    port: 3001,
    routes: {
        // Static routes
        "/": () => {
            return Response.redirect("https://aniby.net/", 301);
        },

        "/da/goal-info/:id": async (req, server,) => {
            if ( !req.headers.has("Authorization")) {
                return new Response("Invalid Authorization header", { status: 401 });
            }

            const authorization = req.headers.get("Authorization")!;
            const id = req.params.id;

            try {
                const response = await fetch(
                    `https://www.donationalerts.com/api/v1/donationgoal/${id}`,
                    {
                        headers: {
                            Authorization: authorization,
                        }
                    }
                );
                return Response.json(await response.json());
            } catch (error) {
                return new Response("Invalid Authorization header", { status: 400 });
            }
        },

        "/terms-of-service": req => {
            return new Response(Bun.file("./src/pages/terms-of-service.html"));
        },
    },

    fetch(req) {
        return new Response("Not Found", { status: 404 });
    },
});
