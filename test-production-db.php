<?php
// test-production-db.php
// Test production database connection
// DELETE THIS FILE AFTER TESTING!

$host = 'localhost';
$dbname = 'production_broshamp'; // Change to your actual production DB name
$user = 'your_db_user';           // Change to your actual DB user
$pass = 'your_db_password';       // Change to your actual DB password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Test query
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
    $result = $stmt->fetch();
    
    echo "✅ SUCCESS! Database connected!\n";
    echo "Database: $dbname\n";
    echo "Users in table: " . $result['count'] . "\n";
    echo "\n⚠️  DELETE THIS FILE NOW!\n";
    
} catch (PDOException $e) {
    echo "❌ ERROR: " . $e->getMessage() . "\n";
}
?>
