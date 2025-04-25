/* eslint-disable react-hooks/exhaustive-deps */
import Cauldron from '@/components/Cauldron';
import ListDivices from '@/sections/ListDivices';
import { useStorage } from '@/store/useStorage';
import { Ingredient, RealTimeCursorEvent } from '@/types';
import { enterInBlur } from '@/variants';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const MAX_INGREDIENTS = 3;

const Item = ({
  index,
  ingredient,
  disabled,
}: {
  index: number;
  ingredient: Ingredient;
  disabled: boolean;
}) => {
  return (
    <motion.li
      key={index}
      initial='hidden'
      animate='visible'
      transition={{ delay: 0.3 + index * 0.1 }}
      variants={enterInBlur}
      className='magic-kitchen__recipe-book__list__item'
    >
      <div
        draggable={!disabled}
        className={`texture-bone magic-kitchen__recipe-book__list__item__content${
          disabled ? ' disabled' : ''
        }`}
        onDragStart={(e: React.DragEvent) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          e.dataTransfer.setData('ingredient', JSON.stringify(ingredient));
        }}
        style={{
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'grab',
        }}
      >
        <h2 className='trajan-pro-bold'>{ingredient.name}</h2>
        <p>{ingredient.description}</p>
      </div>
    </motion.li>
  );
};

function RecipeBook({
  cauldronIngredients,
}: {
  cauldronIngredients: Ingredient[];
}) {
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

      <ul
        className='magic-kitchen__recipe-book__list'
        style={{
          scrollbarWidth: 'thin',
        }}
      >
        {ingredients.map((ingredient, index) => (
          <Item
            key={index}
            index={index}
            ingredient={ingredient}
            disabled={cauldronIngredients.some(
              (i) => i.name === ingredient.name
            )}
          />
        ))}
      </ul>
    </div>
  );
}
export default function MagicKitchen() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [cauldronIngredients, setCauldronIngredients] = useState<Ingredient[]>(
    []
  );

  const ws = useStorage((state) => state.ws);

  useEffect(() => {
    if (cauldronIngredients.length === MAX_INGREDIENTS) {
      console.log('¡El caldero está lleno!');
      const msg: RealTimeCursorEvent = {
        type: 'fetch_dish',
        payload: {
          ingredients: cauldronIngredients.map((ingredient) => ingredient.id),
        },
      };
      ws?.send(JSON.stringify(msg));
      setCauldronIngredients([]);
    }
  }, [cauldronIngredients]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (cauldronIngredients.length >= MAX_INGREDIENTS) return;
    const data = e.dataTransfer.getData('ingredient');
    if (data) {
      const ingredient: Ingredient = JSON.parse(data);
      if (!cauldronIngredients.find((i) => i.name === ingredient.name)) {
        setCauldronIngredients([...cauldronIngredients, ingredient]);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className='magic-kitchen container' ref={constraintsRef}>
        <div
          className='magic-kitchen__cauldron'
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Cauldron ref={constraintsRef} />
          <span className='magic-kitchen__cauldron-text trajan-pro-bold'>
            {cauldronIngredients.length}/{MAX_INGREDIENTS}
          </span>
        </div>
        <RecipeBook cauldronIngredients={cauldronIngredients} />
      </div>
      <div>
        <ListDivices />
      </div>
    </>
  );
}
