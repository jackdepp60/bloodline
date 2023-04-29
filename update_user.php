<?php
// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "family";

$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Get the updated user data from the form
$name = $_POST['name'];
$lastname = $_POST['lastname'];
$location = $_POST['location'];
$user_id = $_POST['user_id'];

// Update the user data in the database
$sql = "UPDATE users SET name='$name', lastname='$lastname', location='$location' WHERE id='$user_id'";

if (mysqli_query($conn, $sql)) {
  echo "User data updated successfully";
} else {
  echo "Error updating user data: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
