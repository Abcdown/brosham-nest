<?php
// api/verify-token.php
// Verify authentication token

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

$token = $data['token'] ?? '';

if (empty($token)) {
    jsonResponse(['error' => 'Token is required'], 400);
}

// For now, we'll just check if token exists and is not empty
// In production, you should verify against database or use JWT
if (strlen($token) === 64) { // Our tokens are 32 bytes = 64 hex chars
    jsonResponse([
        'success' => true,
        'valid' => true,
        'message' => 'Token is valid'
    ], 200);
} else {
    jsonResponse([
        'success' => false,
        'valid' => false,
        'message' => 'Invalid token'
    ], 401);
}
