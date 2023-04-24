<?php
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
