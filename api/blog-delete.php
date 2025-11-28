<?php
define('API_ACCESS', true);
require_once '_bootstrap.php';

header('Content-Type: application/json');
setCorsHeaders();

// Verify authentication
$token = getBearerToken();
if (!$token) {
    http_response_code(401);
    jsonResponse(['success' => false, 'error' => 'No token provided']);
}

$userData = verifyToken($token);
if (!$userData) {
    http_response_code(401);
    jsonResponse(['success' => false, 'error' => 'Invalid token']);
}

// Only handle POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    jsonResponse(['success' => false, 'error' => 'Method not allowed']);
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['id'])) {
        http_response_code(400);
        jsonResponse(['success' => false, 'error' => 'Post ID is required']);
    }
    
    $pdo = getDbConnection();
    
    // Check if post exists
    $stmt = $pdo->prepare("SELECT id FROM blog_posts WHERE id = ?");
    $stmt->execute([$input['id']]);
    
    if (!$stmt->fetch()) {
        http_response_code(404);
        jsonResponse(['success' => false, 'error' => 'Blog post not found']);
    }
    
    // Delete the post
    $stmt = $pdo->prepare("DELETE FROM blog_posts WHERE id = ?");
    $stmt->execute([$input['id']]);
    
    jsonResponse([
        'success' => true,
        'message' => 'Blog post deleted successfully'
    ]);
    
} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    jsonResponse(['success' => false, 'error' => 'Database error']);
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    http_response_code(500);
    jsonResponse(['success' => false, 'error' => $e->getMessage()]);
}
