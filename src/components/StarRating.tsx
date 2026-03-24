import { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface StarRatingProps {
  onRate: (rating: number) => void;
}

export default function StarRating({ onRate }: StarRatingProps) {
  const [hover, setHover] = useState(0);
  const [selected, setSelected] = useState(0);

  const handleClick = (value: number) => {
    setSelected(value);
    onRate(value);
  };

  return (
    <div className="flex gap-2 justify-center">
      {[1, 2, 3, 4, 5].map(i => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleClick(i)}
          className="transition-colors"
        >
          <Star
            size={40}
            className={i <= (hover || selected) ? 'fill-star-fill text-star-fill' : 'text-star-empty'}
          />
        </motion.button>
      ))}
    </div>
  );
}
