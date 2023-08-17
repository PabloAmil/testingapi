const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());


const movies = [
  {
    id: 1,
    name: 'Oppenheimer',
    genre: 'drama',
    img: new URL('https://pics.filmaffinity.com/oppenheimer-828933592-large.jpg')
  },
  {
    id: 2,
    name: 'Insidious',
    genre: 'horror',
    img: new URL('https://pics.filmaffinity.com/insidious_the_red_door-533249268-large.jpg')
  },
  {
    id: 3,
    name: 'Flash',
    genre: 'action',
    img:new  URL('https://pics.filmaffinity.com/the_flash-205686824-large.jpg')
  },
  {
    id: 4,
    name: 'John Wick 4',
    genre: 'action',
    img:new URL('https://pics.filmaffinity.com/john_wick_chapter_4-101402041-large.jpg')
  },
  {
    id: 5,
    name: 'Evil Dead',
    genre: 'horror',
    img: new URL('https://pics.filmaffinity.com/evil_dead_rise-613075292-large.jpg')
  },
  {
    id: 6,
    name: 'Shazam',
    genre: 'action',
    img: new URL('https://pics.filmaffinity.com/shazam_fury_of_the_gods-942384944-large.jpg')
  },
];


app.get('/', (req, res)=> {
  res.json(movies);
})

app.get('/api/movies', (req, res)=> {
  res.send(movies);
})

app.get('/api/movies/:id', (req, res) => {

  const movie = movies.find(movie => movie.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('Movie not found');
  else  {
    res.json(movie)};
});


app.get('/api/movies/byName/:name', (req, res) => {

  const filteredMoviesByName = movies.find((movie) => { 
  return movie.name === req.params.name});
  
  if (filteredMoviesByName.length === 0) return res.status(404).send(`${req.params.name} not found`);
  res.json(filteredMoviesByName)
});


app.get('/api/movies/byGenre/:genre', (req, res) => {

  const filteredMovies = movies.filter((movie) => {
    return movie.genre === req.params.genre
  })
  if (filteredMovies.length === 0) {
    return res.status(404).send(`no se encontro el genero ${req.params.genre}`)
  }
  res.json(filteredMovies)
});

app.post('/api/movies', (req, res) => {
  let newMovie = req.body;
  movies.push(newMovie);
  res.send(JSON.stringify(movies));
});



const port = 3000;

app.listen(port, ()=> {
  console.log(`now listenig to port ${port}`);
});

