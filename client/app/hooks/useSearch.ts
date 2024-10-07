import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, register, logout, getUserCount } from '../services/api';

export const useSearch = () => {
  const [error, setError] = useState<string | null>(null);

  const searchByLocation = async (selectedCountry: string) => {
    try {
      const res = await getUserCount(selectedCountry);
      const data = res.data;

      return data.total_count;
    } catch (err) {
      setError('Registration failed');
    }
  };


  return { searchByLocation, error };
};
