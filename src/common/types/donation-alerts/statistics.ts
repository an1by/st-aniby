import {z} from "zod";

const StreamStatistic = (displayType: string) => {
    return z.object({
        currency: z.string().openapi({example: "RUB"}),
        display_type: z.string().openapi({example: displayType})
    });
};

export const DonatorInfoSchema = z.object({
    id: z.number().openapi({example: 1234567}),
    name: z.string().openapi({example: "An1by"}),
    user_id: z.unknown().openapi({example: null}),
});

export const TopDonatorsSchema =
    StreamStatistic("top_donators").extend({
        donations: z.array(DonatorInfoSchema),
    });

export const TotalRaised =
    StreamStatistic("total_raised").extend({
        amount: z.number().openapi({example: 5722.85}),
        profit: z.number().openapi({example: 5066.29}),
    })
