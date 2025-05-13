import {z} from "zod";

export const GoalIdZod = z
    .string()
    .or(z.number().openapi({example: 1234567}))
    .openapi({
        example: '1234567',
    });

export const GoalIdQuery = {
    id: GoalIdZod,
};
