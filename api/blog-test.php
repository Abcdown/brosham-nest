<?php
define('API_ACCESS', true);
require_once '_bootstrap.php';

header('Content-Type: application/json');

try {
    $pdo = getDbConnection();
    $stmt = $pdo->query("SELECT id, slug, title, status FROM blog_posts ORDER BY created_at DESC");
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'posts' => $posts,
        'count' => count($posts)
    ], JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
