<?php
// api/logout.php
// Logout endpoint - invalidate token

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

// In a full implementation, you would:
// 1. Delete token from sessions table
// 2. Or add token to blacklist
// For now, just return success

jsonResponse([
    'success' => true,
    'message' => 'Logged out successfully'
], 200);
