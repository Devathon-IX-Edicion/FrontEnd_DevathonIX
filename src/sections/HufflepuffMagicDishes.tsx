import { useStoragePersist } from '@/store/useStoragePersist';
import Letter from '../components/Letter';
import { motion } from 'motion/react';
import { Dishe } from '@/types';

function ContentLetter({ dishe }: { dishe: Dishe }) {
  return <div>{dishe.description}</div>;
}
function TitleLetter({ dishe }: { dishe: Dishe }) {
  return (
    <div>
      <h3 className='title-letter'>{dishe.name}</h3>
    </div>
  );
}

export default function HufflepuffMagicDishes() {
  const dishs = useStoragePersist((state) => state.dish);
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
        {dishs.map((item, i) => (
          <Letter
            key={item.name + i}
            titleLetter={<TitleLetter dishe={item} />}
            contentLetter={<ContentLetter dishe={item} />}
          />
        ))}
      </ul>
    </div>
  );
}
