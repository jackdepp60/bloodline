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

if (isset($_GET['lastname'])) {
    $lastname = $_GET['lastname'];

    $sql = "SELECT * FROM users WHERE lastname = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $lastname);
    $stmt->execute();

    $result = $stmt->get_result();
    $users = array();

    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($users);
} else {
    header('HTTP/1.0 400 Bad Request');
    echo "Error: lastname parameter is missing";
}

$conn->close();
?>
