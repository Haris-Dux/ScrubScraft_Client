import type React from "react"
import { useState, useRef, useEffect } from "react"

interface ImageMagnifierProps {
  src: string
  alt: string
  width: number
  height: number
  magnifierSize?: number
  zoomLevel?: number
}

export const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
  src,
  alt,
  width,
  height,
  magnifierSize = 150,
  zoomLevel = 2.5,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current
    if (img) {
      const updateMagnifier = (e: MouseEvent) => {
        const rect = img.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setPosition({ x, y })
        setCursorPosition({ x: e.pageX, y: e.pageY })
      }

      img.addEventListener("mousemove", updateMagnifier)
      img.addEventListener("mouseenter", () => setShowMagnifier(true))
      img.addEventListener("mouseleave", () => setShowMagnifier(false))

      return () => {
        img.removeEventListener("mousemove", updateMagnifier)
        img.removeEventListener("mouseenter", () => setShowMagnifier(true))
        img.removeEventListener("mouseleave", () => setShowMagnifier(false))
      }
    }
  }, [])

  return (
    <div className="relative inline-block">
      <img
        ref={imgRef}
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-cover"
      />
      {showMagnifier && (
        <div
          style={{
            position: "absolute",
            left: `${cursorPosition.x + 10}px`,
            top: `${cursorPosition.y + 10}px`,
            pointerEvents: "none",
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
            border: "2px solid #ffffff",
            borderRadius: "50%",
            boxShadow: "0 0 10px rgba(0,0,0,0.25)",
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${width * zoomLevel}px ${height * zoomLevel}px`,
            backgroundPosition: `${-position.x * zoomLevel + magnifierSize / 2}px ${
              -position.y * zoomLevel + magnifierSize / 2
            }px`,
          }}
        />
      )}
    </div>
  )
}

