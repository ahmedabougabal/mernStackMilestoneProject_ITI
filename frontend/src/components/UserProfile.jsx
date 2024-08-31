import { useEffect, useState } from 'react';
import { Card, Spinner } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('http://localhost:5200/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setError(error.message);
        if (error.message === 'No authentication token found') {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

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
          {/* Add more user details here */}
        </Card>
      )}
    </div>
  );
}

export default UserProfile;