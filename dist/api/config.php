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
define('DB_USER', 'bros_api');
define('DB_PASS', 'tavjot-pehvu5-jeRmyj');
define('DB_CHARSET', 'utf8mb4');

// API Key for general operations (used in your existing APIs)
define('API_KEY', 'bp_live_4718a8dbed102a439550e8038734e12f9d3b3f e17953c883ce9703086e099013');

// JWT Secret for authentication tokens
define('JWT_SECRET', 'jwt_c471da35b70636d1d54a06a f19196815fd018dbf7873e42f5339add6351eb652');

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
