// For the Movie Entry Form (movie-entry.html)
document.getElementById('movieForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const year = document.getElementById('year').value;
    const rating = document.getElementById('rating').value;

    if (title && genre && year && rating) {
        // Send movie data to the backend (PHP MySQL)
        fetch('backend.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `action=add&title=${title}&genre=${genre}&year=${year}&rating=${rating}`
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                // Redirect to Dashboard after successful addition
                window.location.href = 'dashboard.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error while adding the movie. Please try again.');
        });
    } else {
        alert('Please fill in all fields');
    }
});

// For Movie List Page (movie-list.html)
window.onload = function() {
    loadMovies();
}

function loadMovies() {
    fetch('backend.php?action=getAll')
        .then(response => response.json())
        .then(data => {
            if (data.success !== false) {
                displayMovies(data);
            } else {
                alert('Failed to load movies.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error while fetching the movie list. Please try again.');
        });
}

function displayMovies(movies) {
    const tableBody = document.querySelector('#movieTable tbody');
    tableBody.innerHTML = ''; // Clear any existing rows

    // Check if we received any movie data
    if (movies.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4">No movies found.</td>';
        tableBody.appendChild(row);
    }

    // Loop through the movies array and display each movie in a row
    movies.forEach(movie => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${movie.year}</td>
            <td>${movie.rating}</td>
        `;
        tableBody.appendChild(row);
    });
}
