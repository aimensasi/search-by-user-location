'use client'
import { useAuth } from './hooks/useAuth';
import { useRouter } from 'next/navigation';

const Home = () => {
  const { handleLogout } = useAuth();
  const router = useRouter();

  return (
    <div>
      <h1>Welcome to the protected homepage</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
