import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Card, Spinner } from 'flowbite-react';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/users/profile');
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setError("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {user && (
        <Card>
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {user.username}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Email: {user.email}
          </p>
          {/* i will add more user details here :D */}
        </Card>
      )}
    </div>
  );
}

export default UserProfile;