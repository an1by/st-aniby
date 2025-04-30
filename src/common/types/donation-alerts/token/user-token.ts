import {z} from "zod";

const example = "ab1AcdBeCDfghiEjklF2l";
export const zod = z.string().openapi({example});

export default {example, zod};
