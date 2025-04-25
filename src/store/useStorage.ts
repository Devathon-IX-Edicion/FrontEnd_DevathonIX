import { DEVICE_CONNECTION, DEVICE_JOINED, IDevices } from '@/types';
import { create } from 'zustand';

type State = {
  ws: WebSocket | null;
  connectWs: () => void;

  devices: IDevices;
  setDevices: (devices: DEVICE_CONNECTION) => void;
  removeDevice: (id: string) => void;
  addDevice: (device: DEVICE_JOINED) => void;
};

export const useStorage = create<State>((set) => ({
  ws: null,
  connectWs: () => {
    const ws = new WebSocket('ws://localhost:8787/ws/realtime-devathon');
    set({ ws });
  },

  devices: {},
  setDevices: (devices) => set({ devices: devices.devices }),
  removeDevice: (id) =>
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...newDevices } = state.devices;
      return { devices: newDevices };
    }),
  addDevice: (device) => {
    set((state) => {
      return { devices: { ...state.devices, ...device } };
    });
  },
}));
