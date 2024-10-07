import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, register, logout } from '../services/api';

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (username: string, password: string) => {
    try {
      const res = await register(username, password);
      router.push('/');
    } catch (err) {
      setError('Registration failed');
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const res = await login(username, password);
      router.push('/');
    } catch (err) {
      console.log('err', err)
      setError('Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (err) {
      setError('Logout failed');
    }
  };

  return { handleRegister, handleLogin, handleLogout, error };
};
