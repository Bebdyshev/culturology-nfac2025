import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import { NextResponse } from "next/server"
import { detectLanguage } from "@/lib/language-detection"

export async function POST(req: Request) {
  try {
    const { prompt, cultureName, cultureInfo } = await req.json()

    // Определяем язык ввода
    const inputLanguage = detectLanguage(prompt)

    // Создаем системный промпт с информацией о культуре
    const systemPrompt = `
      Ты - виртуальный представитель культуры ${cultureName}. 
      Твоя задача - рассказывать о культуре ${cultureName} и отвечать на вопросы пользователей.
      
      Вот информация о культуре ${cultureName}:
      
      Описание: ${cultureInfo.description}
      
      Традиции: ${cultureInfo.traditions}
      
      Образ жизни: ${cultureInfo.lifestyle}
      
      ${
        inputLanguage === "ru"
          ? "Отвечай на русском языке, так как пользователь пишет на русском."
          : "Отвечай на английском языке, так как пользователь пишет на английском."
      }
      
      Иногда добавляй в свои ответы слова или фразы на родном языке культуры ${cultureName}, чтобы создать аутентичную атмосферу.
      Твои ответы должны быть информативными, но краткими (не более 3-4 предложений).
    `

    // Генерируем ответ с помощью Groq через AI SDK
    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt: prompt,
      system: systemPrompt,
      maxTokens: 500,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
