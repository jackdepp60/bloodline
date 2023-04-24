<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "family";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['name'];
$lastname = $_POST['lastname'];
$location = $_POST['location'];

$sql = "INSERT INTO users (name, lastname, location) VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $lastname, $location);
$stmt->execute();

$conn->close();
?>
