Bun.serve({
    port: 3001,
    routes: {
        // Static routes
        "/": () => {
            return Response.redirect("https://aniby.net/", 301);
        },

        "/da/goal-info/:id": async (req, server,) => {
            const { searchParams } = new URL(req.url)
            if (!searchParams || !(searchParams.has("token"))) {
                return new Response("Authorization token not found", { status: 401 });
            }

            const token = searchParams.get("token")!;
            const id = req.params.id;

            try {
                const goalResponse = await fetch(
                    `https://www.donationalerts.com/api/v1/donationgoal/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                // const response = Response.json(await goalResponse.json());
                // response.headers.set('Access-Control-Allow-Origin', '*');
                // response.headers.set('Access-Control-Allow-Credentials ', 'true');
                // response.headers.set('Access-Control-Allow-Methods', 'OPTIONS, GET');
                // response.headers.set('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, Origin');
                return Response.json(await goalResponse.json());
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
