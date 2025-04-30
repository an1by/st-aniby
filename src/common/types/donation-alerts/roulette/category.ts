import {z} from "zod";
import {UserIdZod} from "#/types/donation-alerts/user";

const CategoryPresetSchemaMeta = z.object({
    category: z.string().openapi({example: "common"}),
    useCards: z.boolean().openapi({example: true}),
})

const CategoryPresetSchema = z.object({
    collection: z.unknown().openapi({example: null}),
    id: z.number().openapi({example: 10}),
    is_default: z.boolean().openapi({example: true}),
    json: z.unknown(),
    meta: CategoryPresetSchemaMeta,
    title: z.string().openapi({example: ""}),
    type: z.string().openapi({example: "roulette-category"}),
    user_id: z.unknown().openapi({example: null}),
    widget_element_id: z.unknown().openapi({example: null}),
});

export const CategorySchema = z.object({
    cards: z.string().openapi({example: "5000 трусов, скам (1 трусы)"}),
    enabled: z.boolean().openapi({example: true}),
    id: z.number().openapi({example: 12345678}),
    json: z.unknown(),
    name: z.string().openapi({example: "Новая категория"}),
    preset: CategoryPresetSchema,
    rarity:z.string().openapi({example: "common"}),
    use_cards: z.boolean().openapi({example: true}),
    user_id: UserIdZod,
})
