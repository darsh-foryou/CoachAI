import { Inngest } from "inngest";

export const inngest = new Inngest({
    id: "Coachai", name: "Coachai", credentials: {
        gemini: {
            apiKey: process.env.GEMINI_API_KEY,
        },
    },
})