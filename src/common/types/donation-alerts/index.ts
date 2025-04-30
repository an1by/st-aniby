import {z} from "zod";

export const ScopeQuery = {
    scope: z
        .string()
        .openapi({
            example: 'oauth-user-show oauth-donation-subscribe'
        })
};
