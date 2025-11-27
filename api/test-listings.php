<?php
// Temporary test script to check listings table
define('API_ACCESS', true);
require_once '_bootstrap.php';

header('Content-Type: application/json');
setCorsHeaders();

try {
    $pdo = getDbConnection();
    
    // Check if listings table exists
    $tableCheck = $pdo->query("SHOW TABLES LIKE 'listings'");
    $tableExists = $tableCheck->rowCount() > 0;
    
    echo "Table exists: " . ($tableExists ? "YES" : "NO") . "\n\n";
    
    if ($tableExists) {
        // Get table structure
        echo "Table structure:\n";
        $columns = $pdo->query("DESCRIBE listings");
        foreach ($columns as $col) {
            echo "- {$col['Field']} ({$col['Type']})\n";
        }
        
        echo "\n";
        
        // Count rows
        $count = $pdo->query("SELECT COUNT(*) as total FROM listings")->fetch();
        echo "Total listings in database: {$count['total']}\n\n";
        
        // Get sample data
        if ($count['total'] > 0) {
            echo "Sample listings:\n";
            $listings = $pdo->query("SELECT id, title, price, listing_status FROM listings LIMIT 5")->fetchAll();
            echo json_encode($listings, JSON_PRETTY_PRINT);
        }
    } else {
        echo "ERROR: Listings table does not exist!\n";
        echo "Available tables:\n";
        $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
        foreach ($tables as $table) {
            echo "- $table\n";
        }
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
