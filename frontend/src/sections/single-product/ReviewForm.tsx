import type React from "react"
import { useState } from "react"
import { StarRating } from "./StarRating"

interface ReviewFormProps {
  onSubmit: (review: { rating: number; comment: string }) => void
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ rating, comment })
    setRating(0)
    setComment("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
          Your Review *
        </label>
        <textarea
          id="review"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Give your rating:</p>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
      >
        Submit Review
      </button>
    </form>
  )
}

