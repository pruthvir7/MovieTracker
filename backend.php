<?php
// MySQL database connection details
$host = 'localhost';
$dbname = 'movie_collection'; // Your database name
$username = 'root';           // Your MySQL username
$password = '';               // Your MySQL password (empty by default)

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    // Log: Starting database connection
    error_log("Attempting to connect to the database...");

    // Create a PDO instance (MySQL connection)
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    error_log("Database connection successful.");

    // Create the movies table if it doesn't exist
    $pdo->exec("CREATE TABLE IF NOT EXISTS movies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        genre VARCHAR(100) NOT NULL,
        year INT NOT NULL,
        rating INT NOT NULL
    )");
    error_log("Movies table checked/created successfully.");

    // Check for actions (add, getAll)
    if (isset($_POST['action'])) {
        $action = $_POST['action'];
        error_log("POST action received: $action");

        if ($action == 'add') {
            // Add a movie to the database
            $title = $_POST['title'];
            $genre = $_POST['genre'];
            $year = $_POST['year'];
            $rating = $_POST['rating'];

            error_log("Adding movie with title: $title, genre: $genre, year: $year, rating: $rating");

            // Insert the movie into the database
            $stmt = $pdo->prepare("INSERT INTO movies (title, genre, year, rating) VALUES (:title, :genre, :year, :rating)");
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':genre', $genre);
            $stmt->bindParam(':year', $year);
            $stmt->bindParam(':rating', $rating);

            if ($stmt->execute()) {
                error_log("Movie added successfully.");
                echo json_encode(['success' => true, 'message' => 'Movie added successfully']);
            } else {
                error_log("Failed to add movie.");
                echo json_encode(['success' => false, 'message' => 'Failed to add movie']);
            }
        }
    }

    // Get all movies from the database
    if (isset($_GET['action']) && $_GET['action'] == 'getAll') {
        error_log("GET action received: getAll");

        $stmt = $pdo->query("SELECT * FROM movies");
        $movies = $stmt->fetchAll(PDO::FETCH_ASSOC);

        error_log("Fetched movies: " . json_encode($movies));

        echo json_encode($movies);
    }

} catch (PDOException $e) {
    error_log("Database connection failed: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $e->getMessage()]);
}
?>
