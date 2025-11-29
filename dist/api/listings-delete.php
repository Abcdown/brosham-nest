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

// Only handle DELETE
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    jsonResponse(['success' => false, 'error' => 'Method not allowed']);
}

try {
    // Get ID from query param or JSON body
    $id = $_GET['id'] ?? null;
    
    if (!$id && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? null;
    }
    
    if (!$id) {
        http_response_code(400);
        jsonResponse(['success' => false, 'error' => 'Listing ID is required']);
    }
    
    $pdo = getDbConnection();
    
    // Check if listing exists
    $stmt = $pdo->prepare("SELECT id, cover_image, gallery FROM listings WHERE id = ?");
    $stmt->execute([$id]);
    $listing = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$listing) {
        http_response_code(404);
        jsonResponse(['success' => false, 'error' => 'Listing not found']);
    }
    
    // Delete from database
    $stmt = $pdo->prepare("DELETE FROM listings WHERE id = ?");
    $stmt->execute([$id]);
    
    // Optional: Delete associated images
    // You can implement image cleanup here if needed
    
    jsonResponse([
        'success' => true,
        'message' => 'Listing deleted successfully',
        'id' => $id
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
