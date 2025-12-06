<?php
// Quick debug script to check listings data
define('API_ACCESS', true);
require_once '_bootstrap.php';

header('Content-Type: application/json');

try {
    $pdo = getDbConnection();
    
    $sql = "SELECT id, title, cover_image, is_featured, listing_status FROM listings LIMIT 5";
    $stmt = $pdo->query($sql);
    $listings = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'count' => count($listings),
        'listings' => $listings
    ], JSON_PRETTY_PRINT);
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}
