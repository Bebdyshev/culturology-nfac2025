import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const culture = searchParams.get("culture") || "default"

  // В реальном приложении здесь был бы запрос статуса видео к HeyGen API
  // и возврат URL готового видео

  // Для демонстрации возвращаем заглушку с информацией о запросе
  return NextResponse.json({
    status: "completed",
    culture: culture,
    video_url: "/placeholder.svg?height=720&width=1280",
    message: "Это заглушка для демонстрации интеграции с HeyGen API",
  })
}
