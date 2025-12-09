import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

export const renderStars = (rating: number | string) => {
  const stars = [];

  if (typeof rating == "number") {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoStar color="#1C1B1F" />);
    }

    if (hasHalfStar) {
      stars.push(<IoStarHalf color="#1C1B1F" />);
    }
  }

  const remainingStars = 5 - Math.ceil(typeof rating == "number" ? rating : 0);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<IoStarOutline key={`empty-${i}`} color="#9CA3AF" />);
  }

  return stars;
};
