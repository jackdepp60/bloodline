<?php
$servername = "localhost";
$username = " cpses_my22579mmg";
$password = "jackdepp60";
$dbname = "myblveio_jackdepp60";

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
