import React from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  onRatingChange,
  readonly = false,
}) => {
  const [hover, setHover] = React.useState<number | null>(null);

  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            title="button"
            type="button"
            key={index}
            onClick={() => onRatingChange?.(ratingValue)}
            onMouseEnter={() => !readonly && setHover(ratingValue)}
            onMouseLeave={() => !readonly && setHover(null)}
            disabled={readonly}
            className={`text-2xl ${
              readonly ? "cursor-default" : "cursor-pointer"
            }`}
          >
            <FaStar
              size={16}
              className={`
                ${
                  (hover || rating) >= ratingValue
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
                transition-colors duration-200
              `}
            />
          </button>
        );
      })}
    </div>
  );
};
