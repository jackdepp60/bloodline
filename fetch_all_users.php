<?php

// Allow access from any origin
header("Access-Control-Allow-Origin: *");

// You can also specify a specific domain if you prefer
// header("Access-Control-Allow-Origin: http://localhost");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Allow specific request headers
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization");

// Your existing PHP code goes here
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "family";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT lastname FROM users";
$result = $conn->query($sql);

$lastNames = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $lastNames[] = $row['lastname'];
    }
}

header('Content-Type: application/json');
echo json_encode($lastNames);

$conn->close();

?>
