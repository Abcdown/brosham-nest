<?php
// api/_bootstrap.php
// Common functions for all API endpoints

// Prevent direct access
if (!defined('API_ACCESS')) {
    http_response_code(403);
    die('Direct access not permitted');
}

// Load configuration
require_once __DIR__ . '/config.php';

// CORS headers function
function setCorsHeaders() {
    header('Access-Control-Allow-Origin: ' . (ALLOWED_ORIGINS ?: '*'));
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-Type: application/json; charset=utf-8');
    
    // Handle preflight requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}

// JSON response helper
function jsonResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit();
}

// Get bearer token from Authorization header
function getBearerToken() {
    $headers = getallheaders();
    
    // Check Authorization header
    if (isset($headers['Authorization'])) {
        if (preg_match('/Bearer\s+(.*)$/i', $headers['Authorization'], $matches)) {
            return $matches[1];
        }
    }
    
    // Check authorization header (lowercase)
    if (isset($headers['authorization'])) {
        if (preg_match('/Bearer\s+(.*)$/i', $headers['authorization'], $matches)) {
            return $matches[1];
        }
    }
    
    return null;
}

// Verify JWT token and return user data
function verifyToken($token) {
    if (!$token) {
        return false;
    }
    
    try {
        $pdo = getDbConnection();
        
        // Simple token verification - decode JWT
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return false;
        }
        
        list($header, $payload, $signature) = $parts;
        
        // Verify signature
        $validSignature = hash_hmac(
            'sha256',
            "$header.$payload",
            JWT_SECRET,
            true
        );
        
        $validSignatureEncoded = base64UrlEncode($validSignature);
        
        if ($signature !== $validSignatureEncoded) {
            return false;
        }
        
        // Decode payload
        $payloadData = json_decode(base64UrlDecode($payload), true);
        
        if (!$payloadData || !isset($payloadData['user_id'])) {
            return false;
        }
        
        // Check expiration
        if (isset($payloadData['exp']) && $payloadData['exp'] < time()) {
            return false;
        }
        
        // Get user from database
        $stmt = $pdo->prepare("SELECT id, username, email, role FROM users WHERE id = ? AND is_active = 1");
        $stmt->execute([$payloadData['user_id']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        return $user ?: false;
        
    } catch (Exception $e) {
        error_log("Token verification error: " . $e->getMessage());
        return false;
    }
}

// Base64 URL encode
function base64UrlEncode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

// Base64 URL decode
function base64UrlDecode($data) {
    return base64_decode(strtr($data, '-_', '+/'));
}

// Get database connection (already exists in config.php)
// Just making sure it's available globally
if (!function_exists('getDbConnection')) {
    function getDbConnection() {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
            return $pdo;
        } catch (PDOException $e) {
            error_log("Database connection failed: " . $e->getMessage());
            http_response_code(500);
            die(json_encode(['error' => 'Database connection failed']));
        }
    }
}
