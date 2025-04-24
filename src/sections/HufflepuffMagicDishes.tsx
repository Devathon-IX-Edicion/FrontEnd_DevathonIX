import Letter from '../components/Letter';
import { motion } from 'motion/react';

const List = Array.from({ length: 10 }, (_, i) => i + 1);

function ContentLetter() {
  return <div>Lorem ipsum dolor sit amet.</div>;
}
function TitleLetter() {
  return <div>Lorem</div>;
}

export default function HufflepuffMagicDishes() {
  return (
    <div className='hufflepuff-magic-dishes'>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='heading-2'
      >
        Hufflepuff Magic Dishes
      </motion.h2>
      <ul className='magic-dishes'>
        {List.map((item) => (
          <Letter
            key={item}
            titleLetter={<TitleLetter />}
            contentLetter={<ContentLetter />}
          />
        ))}
      </ul>
    </div>
  );
}
