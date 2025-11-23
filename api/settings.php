<?php
define('API_ACCESS', true);
require_once '_bootstrap.php';

header('Content-Type: application/json');

// Get settings
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $pdo = getDbConnection();
        
        // Check if settings table exists, if not create it
        $pdo->exec("CREATE TABLE IF NOT EXISTS `settings` (
            `key` varchar(100) NOT NULL PRIMARY KEY,
            `value` text NOT NULL,
            `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
        
        // Get all settings
        $stmt = $pdo->query("SELECT `key`, `value` FROM settings");
        $settings = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $settings[$row['key']] = $row['value'];
        }
        
        // Default settings if not set
        if (!isset($settings['showListings'])) {
            $settings['showListings'] = 'false';
        }
        if (!isset($settings['showGallery'])) {
            $settings['showGallery'] = 'false';
        }
        
        echo json_encode([
            'success' => true,
            'settings' => $settings
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }
}

// Update settings (admin only)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Verify token
        $token = getBearerToken();
        if (!$token) {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'No token provided']);
            exit;
        }
        
        $userData = verifyToken($token);
        if (!$userData) {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'Invalid token']);
            exit;
        }
        
        // Get input
        $input = json_decode(file_get_contents('php://input'), true);
        $key = $input['key'] ?? '';
        $value = $input['value'] ?? '';
        
        if (!$key) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Key is required']);
            exit;
        }
        
        $pdo = getDbConnection();
        
        // Insert or update setting
        $stmt = $pdo->prepare("INSERT INTO settings (`key`, `value`) VALUES (?, ?) 
                               ON DUPLICATE KEY UPDATE `value` = ?");
        $stmt->execute([$key, $value, $value]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Setting updated successfully'
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }
}
