import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { getAuthors,getCategories,addBook,updateBook} from '../services/api';
import Spinner from './Spinner.jsx';



const AddAndUpdate = ({ book, onClose, type }) => {

    const [inputs, setInputs] = useState({});
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // const placeholderImage = "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="


  
  
    useEffect(() => {
        const fetchAuthors = async () => {
          try {
            setLoading(true);
            const response = await getAuthors();
            setAuthors(response.data.data);
            setLoading(false);
          } catch (error) {
            setError(error.message || 'Error fetching authors');
          }
        };
        fetchAuthors();
      }, []);

      useEffect(() => {
      const fetchCategories = async () => {
        try {
            setLoading(true);
          const response = await getCategories();
          if (Array.isArray(response.data.data)) {
            setCategories(response.data.data);
            setLoading(false);
          } else {
            throw new Error('Categories data is not an array');
          }
        } catch (err) {
          setError(err.message || 'Error fetching categories');
        }
        // setLoading(false);
    };
      fetchCategories();
    }, []);




    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    
    const handleSubmit = async(event) => {
        event.preventDefault();

        try{
       if(type=="add"){
        const response = await addBook(inputs);
       }else{
       const response = await updateBook(book._id,inputs);
       }
       onClose()
    }catch (error) {
        console.log(error)
        setError(error.response.data.message || (type=="add"?'Error Adding Book' : 'Error Updating Book' ));
      }
    }


    return (
        <div
            className='fixed bg-black bg-opacity-15 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className='w-[600px] max-w-full h-[500px] bg-white rounded-xl p-4 flex flex-col relative'
            >
                <AiOutlineClose
                    className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
                    onClick={onClose}
                />
                {type=="add" ?
                (<h2 className='my-2 text-gray-500 text-2xl'>New Book</h2>)
                :(<h2 className='my-2 text-gray-500 text-2xl'>Update Book</h2>)}
                <br />
                {loading ? (
   <Spinner />) :(
                <form onSubmit={handleSubmit} >
                    <div className="flex justify-around">
                    <label className="py-4 px-6 border-b">Enter Book Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={inputs.title || ""}
                            onChange={handleChange}
                            className="border p-2 w-1/2"
                        />
                     </div>
                    <br />
                    <div className="flex justify-around">
                    <label className="py-4 px-6 border-b"> Choose Author:</label>
                        <select name="AuthorId" value={inputs.AuthorId } className="border p-2 w-1/2" onChange={handleChange}>
                            {authors.map((author,i) => 
                            <option  key={i} value= {author._id}>{author.firstName + " " + author.lastName}</option>
                        )}
                        </select>
                    </div>
                    <br /> 
                    <div className="flex justify-around">
                    <label className="py-4 px-6 border-b"> Choose Category:</label>
                        <select name="Category" className="border p-2 w-1/2" value={inputs.Category } onChange={handleChange}>
                            {categories.map((category => 
                            <option value= {category._id}>{category.name}</option>
                        ))}
                        </select>
                    </div>
                    <br />
                    <div className="flex justify-around">
                    <label className="py-4 px-6 border-b">Enter image link:</label>
                        <input
                            type="text"
                            name="image"
                            value={inputs.image}
                            onChange={handleChange}
                            className="border p-2 w-1/2"
                        />
                     </div>
                    <br />
                    {type=="add" ?
                    (<input value="Add book" type="submit" />)
                    :(<input value="update" type="submit" />)}
                </form>
   )}
   <div  className="absolute justify-self-center bottom-4 text-3l text-red-600"> {error}</div>
            </div>
        </div>
    );
};

export default AddAndUpdate;