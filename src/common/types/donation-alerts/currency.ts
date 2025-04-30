import {z} from "zod";

export const CurrencySchema = z.object({
    is_payable: z.number().openapi({example: 1}),
    is_symbol_first: z.number().openapi({example: 1}),
    key: z.string().openapi({example: "USD"}),
    symbol: z.string().openapi({example: "$"}),
    title: z.string().openapi({example: "Доллар США"}),
})
