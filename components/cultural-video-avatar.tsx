"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"
import { getCultureStyle } from "@/lib/culture-styles"

type CulturalVideoAvatarProps = {
  cultureName: string
  videoUrl: string | null
  isLoading: boolean
  error: string | null
}

export function CulturalVideoAvatar({ cultureName, videoUrl, isLoading, error }: CulturalVideoAvatarProps) {
  const style = getCultureStyle(cultureName)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Автоматически воспроизводить видео при получении нового URL
  useEffect(() => {
    if (videoUrl && videoRef.current) {
      videoRef.current.load()
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Error playing video:", err))
    }
  }, [videoUrl])

  // Обработчик окончания видео
  const handleVideoEnded = () => {
    setIsPlaying(false)
  }

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
      {/* Фоновый градиент */}
      <div className={`absolute inset-0 bg-gradient-to-br ${style.primaryColor} opacity-10`} />

      {/* Культурный узор */}
      <div className={`absolute inset-0 opacity-5 ${style.patternClass}`} />

      {/* Состояние загрузки */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-10"
          >
            <Loader2 className={`h-12 w-12 animate-spin text-primary mb-4`} />
            <p className="text-center font-medium">Представитель культуры {cultureName} готовит ответ...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Сообщение об ошибке */}
      <AnimatePresence>
        {error && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-10"
          >
            <div className="max-w-md text-center p-6">
              <p className="text-destructive font-medium mb-2">Ошибка</p>
              <p>{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Видео аватар */}
      {videoUrl ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls={false}
          playsInline
          onEnded={handleVideoEnded}
        >
          <source src={videoUrl} type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center p-6">
            <div className={`inline-flex items-center justify-center p-4 rounded-full ${style.secondaryColor} mb-4`}>
              <span className="text-4xl">{style.symbolElement}</span>
            </div>
            <p>Отправьте сообщение, чтобы начать общение с представителем культуры {cultureName}</p>
          </div>
        </div>
      )}

      {/* Индикатор воспроизведения */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-primary/80 text-white text-xs"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-white mr-2 animate-pulse"></span>
            Говорит
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
