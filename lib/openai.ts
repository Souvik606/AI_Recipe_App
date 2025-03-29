import OpenAI from "openai"

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
})

const AIModel=async(prompt:string)=>{
    return openai.chat.completions.create({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
            { role: "user", content: prompt }
        ],
        response_format:{type:'json_object'}
    })
}

export default AIModel;