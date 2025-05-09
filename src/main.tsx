import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './router.routes';
import './styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
