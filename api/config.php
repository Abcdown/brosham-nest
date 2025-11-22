<?php
// api/config.php
// Database configuration for Brosham Properties

// Prevent direct access
if (!defined('API_ACCESS')) {
    http_response_code(403);
    die('Direct access not permitted');
}

// Database credentials
define('DB_HOST', 'localhost');
define('DB_NAME', 'staging_broshamp');
define('DB_USER', 'bros_api'); // Change this to your actual database username
define('DB_PASS', 'tavjot-pehvu5-jeRmyj'); // Change this to your actual database password
define('DB_CHARSET', 'utf8mb4');

// API Key for general operations (used in your existing APIs)
define('API_KEY', 'your-secret-api-key-here'); // Change this!

// JWT Secret for authentication tokens
define('JWT_SECRET', 'your-jwt-secret-key-change-this'); // Change this!

// Session settings
define('SESSION_LIFETIME', 86400); // 24 hours in seconds

// CORS settings
define('ALLOWED_ORIGINS', '*'); // Change to specific domain in production

// Error reporting (disable in production)
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Database connection function
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

// CORS headers
function setCorsHeaders() {
    header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGINS);
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
