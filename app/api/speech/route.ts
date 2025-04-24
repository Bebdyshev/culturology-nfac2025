import { NextResponse } from "next/server"

// Карта голосов ElevenLabs для разных культур
const VOICE_IDS: Record<string, string> = {
  sami: "pNInz6obpgDQGcFmaJgB", // Adam
  hmong: "jsCqWAovK2LkecY7zXl4", // Dorothy
  maori: "XB0fDUnXU5powFXDhCwa", // Thomas
  inuit: "g5CIjZEefAph4nQFvHAz", // Nicole
  yanomami: "ErXwobaYiN019PkySvjV", // Antoni
  default: "EXAVITQu4vr4xnSDxMaL", // Bella
}

export async function POST(req: Request) {
  try {
    const { text, cultureName } = await req.json()

    // Определяем ID голоса на основе культуры
    const cultureKey = Object.keys(VOICE_IDS).find((key) => cultureName.toLowerCase().includes(key))
    const voiceId = cultureKey ? VOICE_IDS[cultureKey] : VOICE_IDS.default

    // Параметры для ElevenLabs API
    const options = {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    }

    // Запрос к ElevenLabs API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, options)

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`)
    }

    // Получаем аудио-данные
    const audioData = await response.arrayBuffer()

    // Возвращаем аудио как бинарные данные
    return new NextResponse(audioData, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    })
  } catch (error) {
    console.error("Error in speech API:", error)
    return NextResponse.json({ error: "Failed to generate speech" }, { status: 500 })
  }
}
