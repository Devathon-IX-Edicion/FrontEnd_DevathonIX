import { useStorage } from '@/store/useStorage';

export default function ListDivices() {
  const devices = useStorage((state) => state.devices);
  console.log('devices', devices);

  return (
    <div className='list-devices container'>
      <h2 className='heading-2 trajan-pro-bold'>Dispositivos Conectados</h2>
      <ul className='devices'>
        {Object.entries(devices).map(([key, device]) => (
          <div
            key={key}
            className='device'
            style={{ '--color': device.color } as React.CSSProperties}
          >
            <span className='cicle'></span>
            <p className='device-status text-xs'>{device.region}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}
