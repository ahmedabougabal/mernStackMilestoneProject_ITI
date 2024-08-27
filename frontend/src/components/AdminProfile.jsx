import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner, Button, Modal, Label, TextInput, Textarea } from 'flowbite-react';

function AdminProfile() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentBook, setCurrentBook] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookDescription, setBookDescription] = useState('');

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [usersResponse, booksResponse] = await Promise.all([
        axios.get('/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('/api/admin/books', {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);
      setUsers(usersResponse.data);
      setBooks(booksResponse.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUserDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (error) {
      console.error("Failed to delete user:", error);
      setError("Failed to delete user");
    }
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/admin/users/${currentUser._id}`, 
        { username, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowUserModal(false);
      fetchData();
    } catch (error) {
      console.error("Failed to update user:", error);
      setError("Failed to update user");
    }
  };

  const handleBookAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/admin/books', 
        { title: bookTitle, author: bookAuthor, description: bookDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowBookModal(false);
      fetchData();
    } catch (error) {
      console.error("Failed to add book:", error);
      setError("Failed to add book");
    }
  };

  const handleBookUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/admin/books/${currentBook._id}`, 
        { title: bookTitle, author: bookAuthor, description: bookDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowBookModal(false);
      fetchData();
    } catch (error) {
      console.error("Failed to update book:", error);
      setError("Failed to update book");
    }
  };

  const handleBookDelete = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/admin/books/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (error) {
      console.error("Failed to delete book:", error);
      setError("Failed to delete book");
    }
  };

  if (loading) return <Spinner aria-label="Loading data..." />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      
      <h3 className="text-xl font-bold mt-6 mb-2">Users</h3>
      <Table>
        <Table.Head>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user) => (
            <Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {user.username}
              </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => {
                  setCurrentUser(user);
                  setUsername(user.username);
                  setEmail(user.email);
                  setShowUserModal(true);
                }}>Edit</Button>
                <Button onClick={() => handleUserDelete(user._id)}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <h3 className="text-xl font-bold mt-6 mb-2">Books</h3>
      <Button onClick={() => {
        setCurrentBook(null);
        setBookTitle('');
        setBookAuthor('');
        setBookDescription('');
        setShowBookModal(true);
      }}>Add New Book</Button>
      <Table>
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Author</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {books.map((book) => (
            <Table.Row key={book._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {book.title}
              </Table.Cell>
              <Table.Cell>{book.author}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => {
                  setCurrentBook(book);
                  setBookTitle(book.title);
                  setBookAuthor(book.author);
                  setBookDescription(book.description);
                  setShowBookModal(true);
                }}>Edit</Button>
                <Button onClick={() => handleBookDelete(book._id)}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* User Modal */}
      <Modal show={showUserModal} onClose={() => setShowUserModal(false)}>
        <Modal.Header>Edit User</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUserUpdate}>
            <div>
              <Label htmlFor="username">Username</Label>
              <TextInput
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <TextInput
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Update User</Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Book Modal */}
      <Modal show={showBookModal} onClose={() => setShowBookModal(false)}>
        <Modal.Header>{currentBook ? 'Edit Book' : 'Add New Book'}</Modal.Header>
        <Modal.Body>
          <form onSubmit={currentBook ? handleBookUpdate : handleBookAdd}>
            <div>
              <Label htmlFor="bookTitle">Title</Label>
              <TextInput
                id="bookTitle"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="bookAuthor">Author</Label>
              <TextInput
                id="bookAuthor"
                value={bookAuthor}
                onChange={(e) => setBookAuthor(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="bookDescription">Description</Label>
              <Textarea
                id="bookDescription"
                value={bookDescription}
                onChange={(e) => setBookDescription(e.target.value)}
                required
              />
            </div>
            <Button type="submit">{currentBook ? 'Update Book' : 'Add Book'}</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminProfile;

// do i need to import that AdminProfile into another file ,
// and do i need anohter controller.js file while i already have a userController.js
// file where it contains :  