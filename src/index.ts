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

        "/da/oauth": async (req) => {
            const {searchParams} = new URL(req.url)
            if (!searchParams.has("scope")) {
                return new Response("Scopes not found", {status: 401});
            }
            const scope = searchParams.get("scope")!;

            const url = `https://www.donationalerts.com/oauth/authorize?client_id=${Bun.env.DA_APP_ID}
                &redirect_uri=${Bun.env.HOST}/oauth/confirm
                &response_type=token
                &scope=${scope}`;
            return Response.redirect(url, 301);
        },
        "/da/oauth/confirm": async (req) => {
            return new Response(Bun.file("./src/pages/da/auth.html"));
        },
        "/da/goal/info": async (req,) => {
            const {searchParams} = new URL(req.url)
            if (!searchParams.has("accessToken")) {
                return new Response("Authorization token not found", {status: 401});
            }
            const token = searchParams.get("accessToken")!;

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
                return new Response("DonationAlerts Error", {status: 400});
            }
        },

        "/da/user/widget": async (req) => {
            const {searchParams} = new URL(req.url)
            if (!searchParams.has("accessToken")) {
                return new Response("Authorization token not found", {status: 401});
            }
            const token = searchParams.get("accessToken")!;

            try {
                const goalResponse = await fetch(
                    `https://www.donationalerts.com/api/v1/user/widget`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                const result = await goalResponse.json();
                return new Response(JSON.stringify(result), responseInit);
            } catch (error) {
                return new Response("DonationAlerts Error", {status: 400});
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
