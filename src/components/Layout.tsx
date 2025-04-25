/* eslint-disable react-hooks/exhaustive-deps */
import { useStorage } from '@/store/useStorage';
import { useStoragePersist } from '@/store/useStoragePersist';
import { Dishe, RealTimeCursorEvent } from '@/types';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { toast, Toaster } from 'sonner';
import MagicWand from './MagicWand';
import Navbar from './Navbar';
import FloatLetter from './FloatLetter';

type Dishe404 = {
  name: string;
  description: string;
}

export default function Layout() {
  const [ open, setOpen ] = useState(false);
  const [ open404, setOpen404 ] = useState(false);
  const [ dishe, setDishe ] = useState<Dishe | null>();
  const [ dishe404, setDishe404 ] = useState<Dishe404 | null>(null);
  const connectWs = useStorage((state) => state.connectWs);
  const ws = useStorage((state) => state.ws);
  const setDevices = useStorage((state) => state.setDevices);
  const removeDevice = useStorage((state) => state.removeDevice);
  const addDevice = useStorage((state) => state.addDevice);
  const setDish = useStoragePersist((state) => state.addDish);

  useEffect(() => {
    if (ws) {
      ws.onopen = () => {
        console.log('WebSocket connection established');
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };

      ws.onmessage = (data) => {
        const message = JSON.parse(data.data) as RealTimeCursorEvent;
        switch (message.type) {
          case 'device_connected':
            setDevices(message.payload);
            break;
          case 'device_disconnected':
            removeDevice(message.payload);
            break;
          case 'device_joined':
            addDevice(message.payload);
            break;
          case 'request_dish':
            setOpen(true);
            setDish(message.payload.dishe);
            setDishe(message.payload.dishe);
            toast.success('¡Receta encontrada!');
            break;
          case 'error':
            toast.error(`Error: ${message.payload.message}`);
            break;
          case '404':
            toast.error(`Error: ${message.payload}`);
            setOpen404(true);
            setDishe404({
              name: 'Receta no encontrada',
              description: 'No se encontró la receta que buscas',
            });
            break;
          default:
            console.warn('Unknown message type:', message.type);
        }
      };

      ws.onerror = (error) => {
        if (error instanceof Error) {
          toast.error(`WebSocket error: ${error.message}`);
        }
        console.log('WebSocket error:', error);
      };
    } else {
      connectWs();
      console.log('Connecting to WebSocket...');
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  return (
    <main>
      {open && dishe && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpen(false);
              setDishe(null);
            }
          }}
        >
          <FloatLetter
            contentLetter={dishe?.description}
            titleLetter={dishe?.name}
          />
        </div>
      )}
      {open404 && dishe404&& (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpen404(false);
              setDishe404(null);
            }
          }}
        >
          <FloatLetter
            contentLetter={dishe404?.description}
            titleLetter={dishe404?.name}
          />
        </div>
      )}
      <Toaster
        position='top-right'
        richColors
        toastOptions={{
          className: 'toast-custom',
          style: {
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
            border: '1px solid var(--foreground)',
            borderRadius: '8px',
          },
        }}
      />
      <MagicWand />
      <Navbar />
      <Outlet />
    </main>
  );
}
