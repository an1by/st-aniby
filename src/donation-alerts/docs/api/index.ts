import {OpenAPIHono} from "@hono/zod-openapi";
import placeholder from "@da/docs/placeholder.ts";
import v1User from "@da/docs/api/v1-user.ts";
import v1DonationGoal from "@da/docs/api/v1-donationgoal.ts";
import v1Token from "@da/docs/api/v1-token.ts";
import v1Env from "@da/docs/api/v1-env.ts";
import v1Currencies from "@da/docs/api/v1-currencies.ts";
import v1WidgetsStat from "@da/docs/api/v1-widgets-stat.ts";
import v1Roulette from "@da/docs/api/v1-roulette.ts";
import v1AdvUserSettings from "@da/docs/api/v1-advusersettings.ts";

const hono = new OpenAPIHono();
// @ts-ignore
hono.openapi(v1Env.front, placeholder);

// @ts-ignore
hono.openapi(v1User.root, placeholder);
// @ts-ignore
hono.openapi(v1User.widget, placeholder);

// @ts-ignore
hono.openapi(v1Currencies.root, placeholder);

// @ts-ignore
hono.openapi(v1DonationGoal.root, placeholder);

// @ts-ignore
hono.openapi(v1Token.widget, placeholder);

// @ts-ignore
hono.openapi(v1WidgetsStat.topDonators, placeholder);
// @ts-ignore
hono.openapi(v1WidgetsStat.totalRaised, placeholder);

// @ts-ignore
hono.openapi(v1Roulette.category, placeholder);

// @ts-ignore
hono.openapi(v1AdvUserSettings.category, placeholder);

export default hono;
