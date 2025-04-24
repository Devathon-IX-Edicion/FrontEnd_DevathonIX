import { enterInBlur } from '@/variants';
import { motion, Variants } from 'motion/react';
import { NavLink } from 'react-router';

const Links = [
  { to: '/MagicKitchen', label: 'Magic Kitchen' },
  { to: '/MagicDishes', label: 'Magic Dishes' },
];

const listVariant: Variants = {
  visible: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
  hidden: {
    transition: {
      when: 'afterChildren',
    },
  },
};

export default function Navbar() {
  return (
    <motion.nav
      className='navbar texture-bone'
      initial='hidden'
      animate='visible'
      variants={enterInBlur}
      transition={{ duration: 0.4 }}
    >
      <motion.ul
        className='navbar-list'
        initial='hidden'
        animate='visible'
        variants={listVariant}
      >
        {Links.map((link) => (
          <motion.div
            style={{ filter: 'blur(var(--blur))' }}
            variants={enterInBlur}
            key={link.to}
          >
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : '')}
              to={link.to}
            >
              {link.label}
            </NavLink>
          </motion.div>
        ))}
      </motion.ul>
    </motion.nav>
  );
}
