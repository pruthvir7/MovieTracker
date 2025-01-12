const form = document.getElementById('movieForm');
const movieList = document.getElementById('movieCollection');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const releaseYear = document.getElementById('releaseYear').value;
    const rating = document.getElementById('rating').value;

    const movie = {
        title: title,
        genre: genre,
        releaseYear: releaseYear,
        rating: rating
    };

    addMovieToDatabase(movie);
});

function addMovieToDatabase(movie) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'add_movie.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            loadMovies();
        }
    };
    xhr.send(JSON.stringify(movie));
}

function loadMovies() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_movies.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const movies = JSON.parse(xhr.responseText);
            movieList.innerHTML = ''; // Clear the previous movie cards
            movies.forEach(function(movie) {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');

                movieCard.innerHTML = `
                    <h3>${movie.title}</h3>
                    <p>Genre: ${movie.genre}</p>
                    <p>Release Year: ${movie.release_year}</p>
                    <p>Rating: ${movie.rating}</p>
                    <button onclick="deleteMovie(${movie.id})">Delete</button>
                `;

                movieList.appendChild(movieCard);
            });
        }
    };
    xhr.send();
}

function deleteMovie(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'delete_movie.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            loadMovies();
        }
    };
    xhr.send(JSON.stringify({ id: id }));
}

window.onload = loadMovies;
