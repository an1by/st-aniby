import {z} from "zod";

export const ExternalErrorResponse = {
    400: {
        content: {
            'application/json': {
                schema: z.object({
                    message: z.string().openapi({example: "DonationAlerts Error"}),
                }),
            }
        },
        description: 'External Error',
    }
}

export const BadRequestResponse = {
    401: {
        content: {
            'application/json': {
                schema: z.object({
                    message: z.string().openapi({example: "Invalid authorization token"})
                }),
            }
        },
        description: 'Bad Request',
    }
}
