import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Header = () => {
  const [data, setData] = useState([]); // State to hold the fetched data

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5200/books');
        console.log('Data fetched:', response); // Log data to the console

        setData(response); // Store data in state
        console.log('Data count:', data.data.count); // Log data to the console
        console.log('Data data:', data.data.data); // Log data to the console
      } catch (error) {
        console.error('There was an error fetching the data!', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <h1>Fetched Data</h1>

      


    </div>
  );
};
export default Header
