<?php
// api/config.example.php
// EXAMPLE Configuration File - DO NOT USE DIRECTLY!
// Copy this file to config.php and update with your actual credentials
//
// Usage:
//   cp api/config.example.php api/config.php
//   Then edit api/config.php with your real database credentials
//
// Database configuration for Brosham Properties

// Prevent direct access
if (!defined('API_ACCESS')) {
    http_response_code(403);
    die('Direct access not permitted');
}

// Database credentials
define('DB_HOST', 'localhost');
define('DB_NAME', 'your_database_name');  // Change to your database name
define('DB_USER', 'your_database_user');  // Change to your database username
define('DB_PASS', 'your_database_password'); // Change to your database password
define('DB_CHARSET', 'utf8mb4');

// API Key for general operations (used in your existing APIs)
define('API_KEY', 'your-secret-api-key-here'); // Generate a secure random key

// JWT Secret for authentication tokens
define('JWT_SECRET', 'your-jwt-secret-key-here'); // Generate a secure random key

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

// Note: setCorsHeaders() and jsonResponse() are now in _bootstrap.php
// to avoid duplicate function declarations
