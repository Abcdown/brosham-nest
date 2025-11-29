<?php
define('API_ACCESS', true);
require_once '_bootstrap.php';

header('Content-Type: application/json');
setCorsHeaders();

try {
    $pdo = getDbConnection();
    
    // Get all published posts with full details
    $sql = "SELECT 
                id, slug, title, status
            FROM blog_posts 
            WHERE status = 'published'
            ORDER BY created_at DESC 
            LIMIT 20";
    
    $stmt = $pdo->query($sql);
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'count' => count($posts),
        'posts' => $posts
    ], JSON_PRETTY_PRINT);
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}
