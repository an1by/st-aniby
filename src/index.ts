const responseInit: ResponseInit = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}

Bun.serve({
    port: 3001,
    routes: {
        // Static routes
        "/": () => {
            return Response.redirect("https://aniby.net/", 301);
        },


        "/da/goal-info": async (req, server,) => {
            const {searchParams} = new URL(req.url)
            if (!searchParams.has("token")) {
                return new Response("Authorization token not found", {status: 401});
            }
            const token = searchParams.get("token")!;

            if (!searchParams.has("id")) {
                return new Response("Goal id not found", {status: 401});
            }
            const id = searchParams.get("id")!;

            try {
                const goalResponse = await fetch(
                    `https://www.donationalerts.com/api/v1/donationgoal/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                const result = await goalResponse.json();
                return new Response(JSON.stringify(result), responseInit);
            } catch (error) {
                return new Response("Invalid Authorization header", {status: 400});
            }
        },

        "/terms-of-service": req => {
            return new Response(Bun.file("./src/pages/terms-of-service.html"));
        },
    },

    fetch(req) {
        return new Response("Not Found", {status: 404});
    },
});
