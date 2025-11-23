<?php
// /api/_bootstrap.php
header('Content-Type: application/json');

// CORS (allow your staging site to call the API)
$config = require $_SERVER['DOCUMENT_ROOT'].'/../private/brosham-config.php';
header('Access-Control-Allow-Origin: ' . $config['origin']);
header('Access-Control-Allow-Headers: Content-Type, X-API-Key');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

// DB connection (PDO)
function db() {
  static $pdo;
  if ($pdo) return $pdo;
  $cfg  = require $_SERVER['DOCUMENT_ROOT'].'/../private/brosham-config.php';
  $dsn  = "mysql:host={$cfg['db']['host']};dbname={$cfg['db']['name']};charset={$cfg['db']['charset']}";
  $pdo  = new PDO($dsn, $cfg['db']['user'], $cfg['db']['pass'], [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);
  return $pdo;
}

// API key check
function require_key() {
  $cfg = require $_SERVER['DOCUMENT_ROOT'].'/../private/brosham-config.php';
  $key = $_SERVER['HTTP_X_API_KEY'] ?? ($_GET['key'] ?? '');
  if (!hash_equals($cfg['api_key'], $key)) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'Forbidden']);
    exit;
  }
}

// Read JSON body
function json_input() {
  $raw = file_get_contents('php://input');
  if ($raw === '' || $raw === null) return [];
  $data = json_decode($raw, true);
  if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
    exit;
  }
  return $data;
}

function out($data) {
  echo json_encode($data);
  exit;
}
