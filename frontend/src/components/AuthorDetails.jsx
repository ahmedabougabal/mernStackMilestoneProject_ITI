import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AuthorDetails = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5200/authors/${id}`);
        setAuthor(response.data);
      } catch (error) {
        console.error("Error fetching author details:", error);
      }
    };
    fetchAuthorDetails();
  }, [id]);

  if (!author) return <div>Loading...</div>;

  return (
    <div>
      <h2>{author.name}</h2>
      <p>Biography: {author.biography}</p>
    </div>
  );
};

export default AuthorDetails;
