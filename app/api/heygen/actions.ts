"use server"

import { getCultureStyle } from "@/lib/culture-styles"

// Типы для работы с HeyGen API
type HeyGenVideoRequest = {
  avatar_id: string
  voice_id: string
  input_text: string
  background_image_url?: string
  webhook_url?: string
}

type HeyGenVideoResponse = {
  video_id: string
  status: string
  url?: string
  error?: string
}

// Маппинг культур к аватарам и голосам HeyGen
const cultureToHeyGenMap = {
  sami: {
    avatar_id: "avatar_sami_01",
    voice_id: "voice_sami_female_01",
    background_url: "/assets/backgrounds/sami-background.jpg",
  },
  hmong: {
    avatar_id: "avatar_hmong_01",
    voice_id: "voice_hmong_female_01",
    background_url: "/assets/backgrounds/hmong-background.jpg",
  },
  maori: {
    avatar_id: "avatar_maori_01",
    voice_id: "voice_maori_male_01",
    background_url: "/assets/backgrounds/maori-background.jpg",
  },
  inuit: {
    avatar_id: "avatar_inuit_01",
    voice_id: "voice_inuit_female_01",
    background_url: "/assets/backgrounds/inuit-background.jpg",
  },
  yanomami: {
    avatar_id: "avatar_yanomami_01",
    voice_id: "voice_yanomami_male_01",
    background_url: "/assets/backgrounds/yanomami-background.jpg",
  },
  // Значения по умолчанию
  default: {
    avatar_id: "avatar_default_01",
    voice_id: "voice_default_01",
    background_url: "/assets/backgrounds/default-background.jpg",
  },
}

// Получение ID аватара и голоса для культуры
function getHeyGenIdsForCulture(cultureName: string) {
  const cultureId = cultureName.toLowerCase().replace(/[^a-z0-9]/g, "")

  for (const [key, value] of Object.entries(cultureToHeyGenMap)) {
    if (key === cultureId || cultureName.toLowerCase().includes(key)) {
      return value
    }
  }

  return cultureToHeyGenMap.default
}

// Функция для генерации видео через HeyGen API
export async function generateCulturalVideoResponse(
  cultureName: string,
  message: string,
): Promise<{ videoUrl: string | null; error: string | null }> {
  try {
    // Получаем стиль культуры для персонализации ответа
    const style = getCultureStyle(cultureName)

    // Получаем ID аватара и голоса для данной культуры
    const { avatar_id, voice_id, background_url } = getHeyGenIdsForCulture(cultureName)

    // Формируем текст ответа (в реальном приложении здесь может быть вызов LLM)
    const responseText = generateCulturalResponse(message, cultureName)

    // Подготавливаем запрос к HeyGen API
    const requestData: HeyGenVideoRequest = {
      avatar_id,
      voice_id,
      input_text: responseText,
      background_image_url: background_url,
    }

    return {
      videoUrl: `/api/heygen/video?culture=${encodeURIComponent(cultureName)}&message=${encodeURIComponent(message)}`,
      error: null,
    }
  } catch (error) {
    console.error("Error generating HeyGen video:", error)
    return {
      videoUrl: null,
      error: "Не удалось сгенерировать видео-ответ. Пожалуйста, попробуйте позже.",
    }
  }
}

// Функция для генерации текстового ответа (заглушка)
function generateCulturalResponse(userInput: string, cultureName: string): string {
  const input = userInput.toLowerCase()

  if (input.includes("привет") || input.includes("здравствуй")) {
    return `Здравствуйте! Я виртуальный представитель культуры ${cultureName}. Рад познакомиться с вами через видео-общение.`
  }

  if (input.includes("традиции") || input.includes("обычаи")) {
    return `Традиции народа ${cultureName} очень богаты и разнообразны. Они включают уникальные ритуалы, церемонии и обычаи, которые передаются из поколения в поколение.`
  }

  if (input.includes("язык") || input.includes("говорят")) {
    return `Язык является важной частью культуры ${cultureName}. Он отражает наше мировоззрение и связь с предками.`
  }

  return `Спасибо за ваш интерес к культуре ${cultureName}. Я здесь, чтобы поделиться знаниями о нашей истории, традициях и образе жизни. Что именно вас интересует?`
}
