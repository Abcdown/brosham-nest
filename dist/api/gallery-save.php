<?php
// api/gallery-save.php
// Create or update gallery image

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
    
    if (!$data) {
        jsonResponse(['error' => 'Invalid JSON data'], 400);
    }
    
    // Validate required fields
    if (empty($data['title'])) {
        jsonResponse(['error' => 'Title is required'], 400);
    }
    
    if (empty($data['image_url'])) {
        jsonResponse(['error' => 'Image URL is required'], 400);
    }
    
    $pdo = getDbConnection();
    
    // Check if updating existing image
    if (!empty($data['id'])) {
        // UPDATE
        $sql = "UPDATE gallery SET 
                title = :title,
                description = :description,
                image_url = :image_url,
                category = :category,
                location = :location,
                display_order = :display_order,
                is_featured = :is_featured,
                status = :status,
                updated_at = NOW()
                WHERE id = :id";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':id' => $data['id'],
            ':title' => $data['title'],
            ':description' => $data['description'] ?? '',
            ':image_url' => $data['image_url'],
            ':category' => $data['category'] ?? 'General',
            ':location' => $data['location'] ?? null,
            ':display_order' => $data['display_order'] ?? 0,
            ':is_featured' => isset($data['is_featured']) ? (int)$data['is_featured'] : 0,
            ':status' => $data['status'] ?? 'active'
        ]);
        
        jsonResponse([
            'success' => true,
            'message' => 'Gallery image updated successfully',
            'id' => $data['id'],
            'action' => 'update'
        ]);
        
    } else {
        // INSERT
        $sql = "INSERT INTO gallery 
                (title, description, image_url, category, location, display_order, is_featured, status, created_at, updated_at) 
                VALUES 
                (:title, :description, :image_url, :category, :location, :display_order, :is_featured, :status, NOW(), NOW())";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':title' => $data['title'],
            ':description' => $data['description'] ?? '',
            ':image_url' => $data['image_url'],
            ':category' => $data['category'] ?? 'General',
            ':location' => $data['location'] ?? null,
            ':display_order' => $data['display_order'] ?? 0,
            ':is_featured' => isset($data['is_featured']) ? (int)$data['is_featured'] : 0,
            ':status' => $data['status'] ?? 'active'
        ]);
        
        $imageId = $pdo->lastInsertId();
        
        jsonResponse([
            'success' => true,
            'message' => 'Gallery image created successfully',
            'id' => $imageId,
            'action' => 'create'
        ], 201);
    }
    
} catch (PDOException $e) {
    error_log("Gallery save error: " . $e->getMessage());
    jsonResponse([
        'success' => false,
        'error' => 'Failed to save gallery image'
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

// Simple token verification (you should enhance this based on your auth system)
function verifyToken($token) {
    // For now, just check if token exists and matches a basic pattern
    // In production, verify JWT token properly
    $storedToken = 'bp_live_4718a8dbed102a439550e8038734e12f9d3b3fe17953c883ce9703086e099013';
    return !empty($token) && strlen($token) > 20;
}
