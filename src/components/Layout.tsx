import { Outlet } from 'react-router';
import Navbar from './Navbar';
import MagicWand from './MagicWand';

export default function Layout() {
  return (
    <main>
      <MagicWand />
      <Navbar />
      <Outlet />
    </main>
  );
}
