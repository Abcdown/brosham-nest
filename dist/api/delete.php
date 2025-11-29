<?php
// /api/delete.php
declare(strict_types=1);

// --- CORS ---
$origin = 'https://staging.broshamproperties.my';
header("Access-Control-Allow-Origin: $origin");
header('Access-Control-Allow-Methods: POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-API-Key');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// --- Key ---
$VALID_KEY = 'xHJKpGmIpLHOouWkVddnbdOUN6hEjYnx8slpXSbvKzBvvlo6ly';
$key = $_POST['key'] ?? $_GET['key'] ?? '';
if (!hash_equals($VALID_KEY, $key)) {
  http_response_code(401);
  header('Content-Type: application/json');
  echo json_encode(['ok' => false, 'error' => 'unauthorized']);
  exit;
}

// Expect folder and name (exact values from list.php)
$folder = basename($_POST['folder'] ?? $_GET['folder'] ?? '');
$name   = basename($_POST['name']   ?? $_GET['name']   ?? '');

if ($folder === '' || $name === '') {
  http_response_code(400);
  header('Content-Type: application/json');
  echo json_encode(['ok' => false, 'error' => 'missing_params']);
  exit;
}

$base = $_SERVER['DOCUMENT_ROOT'] . '/lovable-uploads';
$file = "$base/$folder/$name";

header('Content-Type: application/json');
if (!is_file($file)) {
  http_response_code(404);
  echo json_encode(['ok' => false, 'error' => 'not_found']);
  exit;
}

if (@unlink($file)) {
  echo json_encode(['ok' => true, 'deleted' => ['folder' => $folder, 'name' => $name]]);
} else {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'unlink_failed']);
}
