import { useState } from 'react';
import { getUserCount } from '../services/api';

export const useSearch = () => {
  const [error, setError] = useState<string | null>(null);

  const searchByLocation = async (selectedCountry: string) => {
    try {
      const res = await getUserCount(selectedCountry);
      const data = res.data;
      console.log('data', data)
      return data.total_count;
    } catch (err) {
      setError('Failed to get user count');
    }
  };


  return { searchByLocation, error };
};
