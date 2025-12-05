<?php
// api/gallery-reorder.php
// Update display order of gallery images

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
    
    if (!$data || !isset($data['images']) || !is_array($data['images'])) {
        jsonResponse(['error' => 'Images array is required'], 400);
    }
    
    $pdo = getDbConnection();
    $pdo->beginTransaction();
    
    try {
        // Update display_order for each image
        $stmt = $pdo->prepare("UPDATE gallery SET display_order = :order WHERE id = :id");
        
        foreach ($data['images'] as $index => $imageId) {
            $stmt->execute([
                ':order' => $index,
                ':id' => $imageId
            ]);
        }
        
        $pdo->commit();
        
        jsonResponse([
            'success' => true,
            'message' => 'Gallery order updated successfully'
        ]);
        
    } catch (Exception $e) {
        $pdo->rollBack();
        throw $e;
    }
    
} catch (PDOException $e) {
    error_log("Gallery reorder error: " . $e->getMessage());
    jsonResponse([
        'success' => false,
        'error' => 'Failed to reorder gallery images'
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
