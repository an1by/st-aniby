import {z} from "zod";
import {GoalIdZod} from "#/types/donation-alerts/goal/index.ts";

export const GoalInfoSchema = z.object({
    data: z.object({
        id: GoalIdZod,
        is_active: z.number().openapi({example: 1}),
        is_default: z.number().openapi({example: 1}),
        title: z.string().openapi({example: "На компьютер"}),
        currency: z.string().openapi({example: "RUB"}),
        start_amount: z.number().openapi({example: 0}),
        raised_amount: z.number().openapi({example: 10786.11}),
        goal_amount: z.number().openapi({example: 150000}),
        started_at: z.date().openapi({example: "2025-02-23 16:45:02"}),
        expires_at: z.date().openapi({example: "2025-06-23 21:00:00"}),
        reason: z.string().openapi({example: "default"}),
    })
});
export type GoalInfo = z.infer<typeof GoalInfoSchema>;
