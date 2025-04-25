import Cauldron from '@/components/Cauldron';
import ListDivices from '@/sections/ListDivices';
import RecipeBook from '@/sections/RecipeBook';
import { useRef } from 'react';

export default function MagicKitchen() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div className='magic-kitchen container' ref={constraintsRef}>
        <div className='magic-kitchen__cauldron'>
          <Cauldron ref={constraintsRef} />
          <span className='magic-kitchen__cauldron-text trajan-pro-bold'>
            1/3
          </span>
        </div>
        <RecipeBook />
      </div>
      <div>
        <ListDivices />
      </div>
    </>
  );
}
