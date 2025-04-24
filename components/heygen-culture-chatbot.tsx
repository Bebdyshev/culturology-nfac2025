"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, User, Loader2, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { getCultureStyle } from "@/lib/culture-styles"
import { CulturalVideoAvatar } from "@/components/cultural-video-avatar"
import { generateCulturalVideoResponse } from "@/app/api/heygen/actions"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  videoUrl?: string | null
}

type HeyGenCultureChatbotProps = {
  cultureName: string
  cultureInfo: {
    description: string
    traditions: string
    lifestyle: string
  }
}

export default function HeyGenCultureChatbot({ cultureName, cultureInfo }: HeyGenCultureChatbotProps) {
  const style = getCultureStyle(cultureName)

  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Check if scroll button should be shown
  useEffect(() => {
    const checkScroll = () => {
      if (!messagesContainerRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
      const isScrollable = scrollHeight > clientHeight
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100

      setShowScrollButton(isScrollable && isScrolledUp)
    }

    const container = messagesContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScroll)
      return () => container.removeEventListener("scroll", checkScroll)
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isGenerating) return

    // Добавляем сообщение пользователя
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsGenerating(true)
    setError(null)

    try {
      // Генерируем видео-ответ через HeyGen API
      const { videoUrl, error } = await generateCulturalVideoResponse(cultureName, inputValue)

      if (error) {
        setError(error)
        setIsGenerating(false)
        return
      }

      // Устанавливаем текущий видео URL для отображения
      setCurrentVideoUrl(videoUrl)

      // Добавляем ответ бота с видео
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: "Видео-ответ от представителя культуры",
        sender: "bot",
        timestamp: new Date(),
        videoUrl: videoUrl,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      console.error("Error generating video response:", err)
      setError("Произошла ошибка при генерации видео-ответа")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-background rounded-lg overflow-hidden shadow-lg border border-border">
      {/* Chat header with cultural pattern */}
      <div className={`p-4 bg-gradient-to-r ${style.primaryColor} relative overflow-hidden`}>
        <div className={`absolute inset-0 opacity-10 ${style.patternClass}`} />
        <div className="flex items-center relative z-10">
          <div className="mr-3">
            <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${style.borderColor}`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${style.primaryColor} opacity-30`} />
              <img
                src={style.avatarImage || "/placeholder.svg"}
                alt={`${cultureName} representative`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center text-lg">{style.symbolElement}</div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-lg font-heading text-white">{cultureName} Видео Представитель</h3>
            <p className="text-xs text-white/70">Интерактивный культурный ассистент</p>
          </div>
        </div>
      </div>

      {/* Video avatar display */}
      <div className="p-4 bg-muted/30">
        <CulturalVideoAvatar
          cultureName={cultureName}
          videoUrl={currentVideoUrl}
          isLoading={isGenerating}
          error={error}
        />
      </div>

      {/* Messages area with cultural background */}
      <div
        ref={messagesContainerRef}
        className={`flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/30 relative`}
      >
        <div className={`absolute inset-0 opacity-5 ${style.patternClass}`} />

        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} relative z-10`}
            >
              <div
                className={cn(
                  "max-w-[80%] p-3 shadow-sm",
                  message.sender === "user"
                    ? `bg-gradient-to-r ${style.primaryColor} text-white rounded-2xl rounded-tr-none`
                    : `${style.secondaryColor} ${style.messageStyle} backdrop-blur-sm rounded-2xl rounded-tl-none`,
                )}
              >
                <div className="flex items-start gap-2">
                  {message.sender === "bot" && (
                    <div className={`w-8 h-8 rounded-full overflow-hidden border ${style.borderColor} flex-shrink-0`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${style.primaryColor} opacity-30`} />
                      <div className="flex items-center justify-center h-full text-sm">{style.symbolElement}</div>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">
                      {message.sender === "bot" ? "Видео-ответ от представителя культуры" : message.content}
                    </p>
                    <p className="text-xs mt-1 opacity-70 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <div className="bg-white/20 p-1 rounded-full mt-0.5 flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-20 right-4 z-20"
          >
            <Button
              size="icon"
              variant="secondary"
              className={`rounded-full shadow-md ${style.borderColor} h-8 w-8`}
              onClick={scrollToBottom}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area with cultural styling */}
      <div className={`p-4 border-t ${style.borderColor} bg-background/80 backdrop-blur-sm`}>
        <div
          className={`flex items-center gap-2 ${style.secondaryColor} rounded-full pl-4 pr-1 py-1 ${style.borderColor}`}
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Задайте вопрос представителю культуры..."
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
            disabled={isGenerating}
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            disabled={!inputValue.trim() || isGenerating}
            className={`bg-gradient-to-r ${style.primaryColor} hover:opacity-90 text-white rounded-full h-8 w-8`}
          >
            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
