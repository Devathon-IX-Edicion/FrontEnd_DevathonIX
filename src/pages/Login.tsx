import { useStoragePersist } from '@/store/useStoragePersist';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/login.css';

export default function Login() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [error, setError] = useState('');
  const name = useStoragePersist((state) => state.name);
  const setName = useStoragePersist((state) => state.setName);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    const { username } = formObject;
    if (!username) {
      setError('Por favor, ingresa tu nombre.');
    } else {
      setShowWelcome(true);
      setName(username as string);
      setError('');
      const timer = setTimeout(() => {
        navigate('/MagicKitchen');
        clearTimeout(timer);
      }, 2000);
    }
  };

  return (
    <div className='login-overlay'>
      {' '}
      <div className='login-container'>
        {' '}
        {!showWelcome ? (
          <>
            {' '}
            <h2 className='login-title'>bienvenido a la cocina mágica</h2>{' '}
            <form className='login-form' onSubmit={handleSubmit}>
              {' '}
              <input
                type='text'
                placeholder='Tu nombre'
                className='login-input'
                autoFocus
                name='username'
              />{' '}
              {error && <p className='login-error'>{error}</p>}{' '}
              <button type='submit' className='login-button'>
                {' '}
                Entrar{' '}
              </button>{' '}
            </form>{' '}
          </>
        ) : (
          <div className='welcome-screen'>¡Bienvenido, {name}!</div>
        )}{' '}
      </div>{' '}
    </div>
  );
}
