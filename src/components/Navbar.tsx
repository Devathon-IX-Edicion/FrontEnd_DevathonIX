import { useStorage } from '@/store/useStorage';
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

const CunterConnects = () => {
  const devices = useStorage((state) => state.devices);
  const deviceKeys = Object.keys(devices);
  const count = deviceKeys.length;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {count > 2 && (
        <span
          style={{
            height: '36px',
            aspectRatio: '1/1',
            borderRadius: '50%',
            background: 'var(--foreground)',
            display: 'inline-block',
            padding: '10px',
            fontSize: 12,
            border: '2px solid var(--background)',
            color: 'var(--background)',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {count}
        </span>
      )}
      {Object.entries(devices)
        .slice(0, 2)
        .map(([key, device], i) => (
          <span
            key={key}
            style={{
              height: '100%',
              aspectRatio: '1/1',
              borderRadius: '50%',
              background: device.color,
              display: 'inline-block',
              marginLeft: count > 2 ? -10 : i === 0 ? 0 : -10,
              padding: '10px',
              fontSize: 10,
              textAlign: 'center',
              border: '2px solid var(--background)',
            }}
          >
            {device.region}
          </span>
        ))}
    </div>
  );
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
        <motion.div
          style={{
            filter: 'blur(var(--blur))',
            textDecoration: '1px underline var(--foreground)',
          }}
          variants={enterInBlur}
          className='cunter-connects'
        >
          <CunterConnects />
        </motion.div>
      </motion.ul>
    </motion.nav>
  );
}
