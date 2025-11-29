<?php
// api/login.php
// Admin login endpoint

define('API_ACCESS', true);
require_once '_bootstrap.php';

setCorsHeaders();

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    jsonResponse(['error' => 'Invalid JSON'], 400);
}

// Validate input
$username = trim($data['username'] ?? '');
$password = $data['password'] ?? '';

if (empty($username) || empty($password)) {
    jsonResponse(['error' => 'Username and password are required'], 400);
}

try {
    $pdo = getDbConnection();
    
    // Get user from database
    $stmt = $pdo->prepare("
        SELECT id, username, password, email, full_name, role, is_active, last_login
        FROM users 
        WHERE username = :username 
        LIMIT 1
    ");
    
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch();
    
    // Debug logging (remove in production)
    error_log("Login attempt for: " . $username);
    error_log("User found: " . ($user ? 'yes' : 'no'));
    
    if (!$user) {
        // User not found - use generic error message for security
        error_log("User not found in database");
        jsonResponse(['error' => 'Invalid credentials'], 401);
    }
    
    // Check if user is active
    if (!$user['is_active']) {
        error_log("User account is disabled");
        jsonResponse(['error' => 'Account is disabled'], 403);
    }
    
    // Verify password
    error_log("Verifying password...");
    if (!password_verify($password, $user['password'])) {
        error_log("Password verification failed");
        jsonResponse(['error' => 'Invalid credentials'], 401);
    }
    
    error_log("Login successful for: " . $username);
    
    // Update last login
    $updateStmt = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = :id");
    $updateStmt->execute(['id' => $user['id']]);
    
    // Generate JWT token
    $tokenExpiry = time() + SESSION_LIFETIME;
    
    // Create JWT header
    $header = json_encode([
        'typ' => 'JWT',
        'alg' => 'HS256'
    ]);
    
    // Create JWT payload
    $payload = json_encode([
        'user_id' => $user['id'],
        'username' => $user['username'],
        'role' => $user['role'],
        'iat' => time(),
        'exp' => $tokenExpiry
    ]);
    
    // Encode Header and Payload
    $base64UrlHeader = base64UrlEncode($header);
    $base64UrlPayload = base64UrlEncode($payload);
    
    // Create Signature
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, JWT_SECRET, true);
    $base64UrlSignature = base64UrlEncode($signature);
    
    // Create JWT
    $token = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    
    // Remove password from response
    unset($user['password']);
    
    // Success response
    jsonResponse([
        'success' => true,
        'message' => 'Login successful',
        'token' => $token,
        'token_expiry' => $tokenExpiry,
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'full_name' => $user['full_name'],
            'role' => $user['role']
        ]
    ], 200);
    
} catch (PDOException $e) {
    error_log("Login error: " . $e->getMessage());
    jsonResponse(['error' => 'Login failed'], 500);
}
