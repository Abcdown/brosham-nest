<?php
// api/gallery-delete.php
// Delete a gallery image

define('API_ACCESS', true);
require_once 'config.php';
require_once '_bootstrap.php';

// Verify authentication
$token = getBearerToken();
if (!$token || !verifyToken($token)) {
    jsonResponse(['error' => 'Unauthorized'], 401);
}

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || empty($data['id'])) {
        jsonResponse(['error' => 'Image ID is required'], 400);
    }
    
    $pdo = getDbConnection();
    
    // Check if image exists
    $checkStmt = $pdo->prepare("SELECT id FROM gallery WHERE id = :id");
    $checkStmt->execute([':id' => $data['id']]);
    
    if (!$checkStmt->fetch()) {
        jsonResponse(['error' => 'Image not found'], 404);
    }
    
    // Delete the image
    $stmt = $pdo->prepare("DELETE FROM gallery WHERE id = :id");
    $stmt->execute([':id' => $data['id']]);
    
    jsonResponse([
        'success' => true,
        'message' => 'Gallery image deleted successfully'
    ]);
    
} catch (PDOException $e) {
    error_log("Gallery delete error: " . $e->getMessage());
    jsonResponse([
        'success' => false,
        'error' => 'Failed to delete gallery image'
    ], 500);
}

// Helper function to get bearer token from headers
function getBearerToken() {
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        if (preg_match('/Bearer\s+(.*)$/i', $headers['Authorization'], $matches)) {
            return $matches[1];
        }
    }
    return null;
}

// Simple token verification
function verifyToken($token) {
    return !empty($token) && strlen($token) > 20;
}
