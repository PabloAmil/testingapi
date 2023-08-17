import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';


function App() {

  const [movies, setMovies] = useState([]);
  const [currentGenre, setCurrentGenre] = useState('all');
  const [searchName, setSearchName] = useState('');


  useEffect(() => {

    // cada filtro es una llamada distinta a la api? o es 
    // mejor llamar el objeto entero y desde aca filtrar?

    // si es asi, para que manejar las solicitudes desde los endpoints?

    let endpoint = 'http://localhost:3000/api/movies';
    if (currentGenre !== 'all') {
      endpoint = `http://localhost:3000/api/movies/byGenre/${currentGenre}`;
    }

    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        if (searchName) {
          const filteredMovies = data.filter(movie => {
            return movie.name.toLowerCase().includes(searchName.toLowerCase())
          })
          setMovies(filteredMovies);
        }
        else {
          setMovies(data);
        }
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, [currentGenre, searchName]);

  function manageClick(str) {
    return setCurrentGenre(str);
  }


  return (
    <>
      <div className='header'>
        <div>
          <button className='category-button'>Search by Category</button>
          <div className='options'>
            <button onClick={() => { manageClick('all') }}>All</button>
            <button onClick={() => { manageClick('horror') }}>Horror</button>
            <button onClick={() => { manageClick('drama') }}>Drama</button>
            <button onClick={() => { manageClick('action') }}>Action</button>
          </div>
        </div>
        <div className='search-bar'>
          <input type="text" placeholder='Search by name' value={searchName} onChange={e => setSearchName(e.target.value)} />
        </div>
      </div>
      <div className='movie-container'>
        <div className='card-displayer'>
          {
            movies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App;
