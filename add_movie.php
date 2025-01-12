<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "movie_tracker";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

$title = $data['title'];
$genre = $data['genre'];
$releaseYear = $data['releaseYear'];
$rating = $data['rating'];

$sql = "INSERT INTO movies (title, genre, release_year, rating) VALUES ('$title', '$genre', '$releaseYear', '$rating')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
