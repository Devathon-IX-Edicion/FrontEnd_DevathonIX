import { useRef } from 'react';
import Cauldron from '@/components/Cauldron';
import { motion } from 'motion/react';
import { enterInBlur } from '@/variants';
import ListDivices from '@/sections/ListDivices';

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
        </div>
      </div>
      <div>
        <ListDivices />
      </div>
    </>
  );
}
