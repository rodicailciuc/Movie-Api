import findMovie from '../utils/findMovies.js';

let movies = [
    {
        id: '1',
        name: 'Spiderman',
        genre: 'Action',
        year: 2015
    },
    {
        id: '2',
        name: 'Thor',
        genre: 'Action',
        year: 2008
    },
    {
        id: '3',
        name: 'BatMan',
        genre: 'Action',
        year: 2003
    }
];

const movieControllers = {
    // Get all movies from the list
    getMovies: (req, res) => {
        res.status(200).json(movies);
    },

    // Get a specific movie by its ID
    getMovie: (req, res) => {
        const { id } = req.params;
        const movieExist = findMovie(movies, id);

        if (movieExist) {
            res.status(200).json(movieExist);
        } else {
            res.status(404).json({
                message: `Movie with id : ${id} does't exists`
            });
        }
    },

    // Create a new movie to the list
    createMovie: (req, res) => {
        const { name, genre, year } = req.body;
        if (!name || !genre || !year) {
            res.status(400).json({
                message: 'Please provide a valid name, genre and year'
            });
        } else {
            const newMovie = {
                id: String(movies.length + 1),
                name,
                genre,
                year
            };
        }
        movies.push(newMovie);
        res.status(201).json(newMovie);
    },

    // Update an existing movie by ID
    updateMovie: (req, res) => {
        const { id } = req.params;
        const { name, genre, year } = req.body;

        const movieExist = findMovie(movies, id);

        if (movieExist) {
            if (!name || !genre || !year) {
                res.status(400).json({
                    message: 'Please provide a valid name, genre and year'
                });
            } else {
                movieExist.name = name;
                movieExist.genre = genre;
                movieExist.year = year;
                res.status(200).json(movieExist);
            }
        } else {
            res.status(404).json({
                message: `Movie with id : ${id} does't exists`
            });
        }
    },

    // Delete a specific movie by its ID
    deleteMovie: (req, res) => {
        const { id } = req.params;
        const movieExist = findMovie(movies, id);
        if (movieExist) {
            movies = movies.filter((movie) => movie.id !== id);
            res.status(200).json({
                message: `Movie with id : ${id} was deleted succesfuly`
            });
        } else {
            res.status(404).json({
                message: `Movie with id : ${id} does't exists`
            });
        }
    }
};

export default movieControllers;
