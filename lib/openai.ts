import OpenAI from "openai"

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
})

const AIModel=async(prompt:string)=>{
    return await openai.chat.completions.create({
        model: "google/gemini-2.5-pro-exp-03-25:free",
        messages: [
            { role: "user", content: prompt }
        ],
        response_format:{type:'json_object'}
    })
}

export default AIModel;