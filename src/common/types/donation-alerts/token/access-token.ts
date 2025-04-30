import {z} from "zod";
import jwt from "jsonwebtoken";

const generateExampleAccessToken = (scopes: string[]): string => {
    const payload = {
        aud: "2",
        jti: "123456a1ab12ab2134567123a4567891ab1234567abc123456789abc12",
        iat: 1745962542.9031,
        nbf: 1745962542.9031,
        exp: 1746567342.8951,
        sub: "12345678",
        scopes
    }
    return jwt.sign(payload, null, {algorithm: 'none'});
}

const generateAll = (scopes: string[]) => {
    const example = generateExampleAccessToken(scopes);
    const zod = z.string().openapi({example});
    const query = {accessToken: zod};
    const headers = z.object({
        Authorization: z.string().openapi({
            example: `Bearer ${example}`
        })
    });
    return {example, zod, query, headers};
}

const widget = generateAll(["widget-streamer"]);
const dashboard = generateAll(["dashboard-streamer"]);

export default {widget, dashboard};
