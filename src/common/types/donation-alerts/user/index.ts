import {z} from "zod";
import userToken from "#/types/donation-alerts/token/user-token.ts";

export const UserIdZod = z.number().openapi({example: 12345678});

const user = {
    id: UserIdZod,
    code: z.string().openapi({example: "an1byvt"}),
    name: z.string().openapi({example: "an1byvt"}),
    is_active: z.number().openapi({example: 1}),
    avatar: z.string().openapi({example: "https://static-cdn.jtvnw.net/jtv_user_pictures/8d75e851-fc76-4408-9ca6-2f63c5c735f2-profile_image-300x300.png"}),
    language: z.string().openapi({example: "ru_RU"}),
    socket_connection_token: z.string().openapi({example: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVc2VyOjEyMzQ1Njc4In0.YfsuJ7aR_FP9O-fIEEEc3v2R9Zihqk3x7KC4naHvKGI"}),
    timezone: z.string().openapi({example: "Europe/Moscow"}),
    main_currency: z.string().openapi({example: "RUB"}),
    token: userToken.zod,
    black_list_words: z.array(z.string()).openapi({example: ["nword"]}),
    adv_brands: z.array(z.string()).openapi({example: []}),
};

export const BalanceSchema = z.object({
    balance: z.number().openapi({example: 4.4}),
    currency: z.string().openapi({example: "EUR"}),
    type: z.number().openapi({example: 1})
});

export const UserSchema = z.object({
    data: z.object(user)
});

export const UserExtendedSchema = z.object({
    data: z.object({
        ...user,
        balance_in_main_currency: z.number().openapi({example: 999.99}),
        balances: z.array(BalanceSchema),
        adv_balance_in_main_currency: z.unknown().openapi({example: null}),
        adv_balances: z.array(z.unknown()).openapi({example: []}),
        email: z.string().openapi({example: "aniby@aniby.net"}),
        roles: z.array(z.string()).openapi({example: ["streamer"]}),
        suggested_country_id: z.number().openapi({example: 188}),
    })
});

export const AdvancedUserSettingsSchema = z.object({
    data: z.object({
        id: z.number().openapi({example: 123456, description: "Not user id"}),
        igromarket_code: z.unknown().openapi({example: null}),
        adv_note_price: z.number().openapi({example: 0}),
        adv_note_price_currency: z.string().openapi({example: "RUB"}),
        country: z.object({
            id: z.number().openapi({example: 188}),
        }),
        last_name: z.string().openapi({example: ""}),
        first_name: z.string().openapi({example: ""}),
        middle_name: z.string().openapi({example: ""}),
        phone_number: z.string().openapi({example: ""}),
        business_entity_type: z.unknown().openapi({example: null}),
        tin: z.unknown().openapi({example: null}),
    })
});
