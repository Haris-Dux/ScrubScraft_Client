import { FaStar } from "react-icons/fa";

export const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<FaStar key={i} className="text-[#FFC209]" size={14} />);
  }
  return <div className="flex ">{stars}</div>;
};
