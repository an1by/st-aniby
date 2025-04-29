import type {Server} from "bun";

export type Route = (req: Request, server: Server) => Response | Promise<Response>;

export class HttpRouter {
    public _alias: string;
    public _routes: Record<string, Route | HttpRouter>;

    constructor(alias: string, routes: Record<string, Route | HttpRouter>) {
        this._alias = alias;
        this._routes = routes;
        this.route = this.route.bind(this);
    }

    route(req: Request, server: Server): Response | Promise<Response> {
        const url = new URL(req.url);
        const path = url.pathname.slice(this._alias.length);

        for (let key of Object.keys(this._routes)) {
            if (path.startsWith(key)) {
                const element = this._routes[key];
                return element instanceof HttpRouter ? element.route(req, server) : element(req, server);
            }
        }

        return new Response("Not Found", {status: 404});
    }
}
