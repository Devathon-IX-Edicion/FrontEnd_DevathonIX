import { NavLink } from 'react-router';

const Links = [
  { to: '/', label: 'Login' },
  { to: '/MagicKitchen', label: 'Magic Kitchen' },
];
export default function Navbar() {
  return (
    <nav className='navbar container'>
      <ul>
        {Links.map((link) => (
          <NavLink
            key={link.to}
            className={({ isActive }) => (isActive ? 'active' : '')}
            to={link.to}
          >
            {link.label}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}
