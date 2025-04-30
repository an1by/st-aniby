import type {Context} from "hono";
import {ZodError} from "zod";

export const DonationAlertsThrowableError = (ctx: Context, error: unknown) => {
    if (error instanceof ZodError) {
        return ctx.json({message: "Validation error", error}, 400);
    }
    return ctx.json({message: "DonationAlerts error", error}, 400);
}

export const DonationAlertsAccessTokenError = (ctx: Context) => {
    return ctx.json({message: "Access token not found"}, 401);
}
