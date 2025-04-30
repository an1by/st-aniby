import {z} from "zod";

export const GoalIdZod = z
    .string()
    .openapi({
        example: '1234567',
    });

export const GoalIdQuery = {
    id: GoalIdZod,
};
