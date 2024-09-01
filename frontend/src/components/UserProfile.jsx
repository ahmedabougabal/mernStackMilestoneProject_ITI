// src/components/UserProfile.js
import React from 'react';
import { useEffect, useState } from 'react';
import { getCuser,getCuserd} from '../services/api'; // Import your API function
import BackButton from './BackButton.jsx';



const UserProfile = () => {

  const [userData, setUserData] = useState({}); 


  useEffect(() => {
    const fetchuser = async () => {
      try {
        const tokenn = localStorage.getItem('token');
        const response0 = await getCuser({"token": tokenn});
        // console.log(response.data.userId);
        const response = await getCuserd(response0.data.userId);
        console.log(response.data.isAdmin);
        setUserData(response.data)

      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchuser();
  }, []);

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <BackButton />

      <div className="relative m-10">

        <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2 flex justify-center">
          <img
            className="w-24 h-24 object-cover rounded-full border-4 border-white"
            src="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" // Placeholder for profile photo
            alt="Profile"
          />
        </div>
      </div>
      <br />
      <div className="text-center py-6">
        <h2 className="text-2xl font-semibold text-gray-800">{userData.username}</h2>
        <p className="text-gray-500 mt-2">Welcome to my profile!</p> {/* Static bio */}
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex justify-center items-center">
          <a
            href={`mailto:${userData.email}`}
            className="text-blue-500 hover:underline"
          >
            {userData.email}
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
