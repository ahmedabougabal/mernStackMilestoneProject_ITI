import HomeBook from './../components/HomeBook';


function HomePage() {

  return (
    <div>
    <div className='g-gray-100 flex items-center justify-center my-10'>
    <h1 className="text-4xl font-extrabold text-gray-800 justify-self-center">Welcome to Goodreads Clone</h1>
    <hr />
    </div>
    <HomeBook />
    </div>
  );
}

export default HomePage;
