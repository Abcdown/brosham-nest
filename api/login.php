<?php
// api/login.php
// Admin login endpoint

define('API_ACCESS', true);
require_once 'config.php';

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
    
    if (!$user) {
        // User not found - use generic error message for security
        jsonResponse(['error' => 'Invalid credentials'], 401);
    }
    
    // Check if user is active
    if (!$user['is_active']) {
        jsonResponse(['error' => 'Account is disabled'], 403);
    }
    
    // Verify password
    if (!password_verify($password, $user['password'])) {
        jsonResponse(['error' => 'Invalid credentials'], 401);
    }
    
    // Update last login
    $updateStmt = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = :id");
    $updateStmt->execute(['id' => $user['id']]);
    
    // Generate session token (simple approach - you can use JWT for production)
    $token = bin2hex(random_bytes(32));
    $tokenExpiry = time() + SESSION_LIFETIME;
    
    // Store session in database (create sessions table) or use JWT
    // For now, we'll return a simple token that the frontend will store
    
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
