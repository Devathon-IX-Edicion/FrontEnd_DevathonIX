import { Outlet } from 'react-router';
import Navbar from './Navbar';
import MagicWand from './MagicWand';
import { toast, Toaster } from 'sonner';
import { useEffect } from 'react';
import { useStorage } from '@/store/useStorage';
import { RealTimeCursorEvent } from '@/types';
import { useStoragePersist } from '@/store/useStoragePersist';

export default function Layout() {
  const connectWs = useStorage((state) => state.connectWs);
  const ws = useStorage((state) => state.ws);
  const setDevices = useStorage((state) => state.setDevices);
  const removeDevice = useStorage((state) => state.removeDevice);
  const addDevice = useStorage((state) => state.addDevice);
  const setIngredients = useStoragePersist((state) => state.setIngredients);
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
          case 'request_ingredients':
            setIngredients(message.payload);
            break;
          case 'request_dish':
            setDish(message.payload.dishe);
            break;
          case 'error':
            toast.error(`Error: ${message.payload.message}`);
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
  }, [
    addDevice,
    connectWs,
    removeDevice,
    setDevices,
    setDish,
    setIngredients,
    ws,
  ]);

  return (
    <main>
      <Toaster
        position='top-right'
        richColors
        toastOptions={{
          className: 'toast-custom',
          style: {
            backgroundColor: '#1f2937',
            color: '#fff',
          },
        }}
      />
      <MagicWand />
      <Navbar />
      <Outlet />
    </main>
  );
}
