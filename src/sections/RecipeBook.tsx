import { useStorage } from '@/store/useStorage';
import { enterInBlur } from '@/variants';
import { motion } from 'motion/react';

export default function RecipeBook() {
  const ingredients = useStorage((state) => state.ingredients);
  return (
    <div className='magic-kitchen__recipe-book texture-bone'>
      <motion.h2
        style={{ filter: 'blur(var(--blur))' }}
        initial='hidden'
        animate='visible'
        transition={{ delay: 0.3 }}
        variants={enterInBlur}
        className='heading-2'
      >
        Resetario
      </motion.h2>

      <ul className='magic-kitchen__recipe-book__list'>
        {ingredients.map((ingredient, index) => (
          <motion.li
            key={index}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.3 + index * 0.1 }}
            variants={enterInBlur}
          >
            <h2 className='trajan-pro-bold'>{ingredient.name}</h2>
            <p>{ingredient.description}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
