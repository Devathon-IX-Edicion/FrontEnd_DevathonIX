import { motion } from 'motion/react';
import { dataMagicKitchen } from '../data/data-magic-kitchen';
import { useRef } from 'react';

export default function MagicKitchen() {
  const constraintsRef = useRef(null);

  return (
    <div className='magic-kitchen container' ref={constraintsRef}>
      <div className='magic-kitchen__list-container'>
        <div className='magic-kitchen__search'>
          <input type='text' name='' id='' placeholder='buscar' />
        </div>
        <ul className='magic-kitchen__list'>
          {dataMagicKitchen.map((item) => (
            <motion.li
              key={item.id}
              className='magic-kitchen__item'
              dragConstraints={constraintsRef}
              drag
              dragSnapToOrigin
            >
              {/* <img src={item.image} alt={item.name} /> */}
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Cost: {item.cost}</p>
              <p>Type: {item.type}</p>
              <p>Effect: {item.effect}</p>
              <p>Effect Value: {item.effectValue}</p>
              <p>Effect Duration: {item.effectDuration}</p>
            </motion.li>
          ))}
        </ul>
      </div>
      <div className='magic-kitchen__actions'>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div className='kitchen'></div>

        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}
