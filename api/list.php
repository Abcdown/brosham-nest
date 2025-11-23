<?php
// /api/list.php
declare(strict_types=1);

// --- CORS (same as upload) ---
$origin = 'https://staging.broshamproperties.my';
header("Access-Control-Allow-Origin: $origin");
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-API-Key');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// --- Simple key check (same key as upload.php) ---
$VALID_KEY = 'xHJKpGmIpLHOouWkVddnbdOUN6hEjYnx8slpXSbvKzBvvlo6ly';
$key = $_GET['key'] ?? '';
if (!hash_equals($VALID_KEY, $key)) {
  http_response_code(401);
  header('Content-Type: application/json');
  echo json_encode(['ok' => false, 'error' => 'unauthorized']);
  exit;
}

$base = $_SERVER['DOCUMENT_ROOT'] . '/lovable-uploads';

// Optional filters
$folder = isset($_GET['folder']) ? basename($_GET['folder']) : null; // e.g. 2025-09-02
$limit  = max(1, min(200, (int)($_GET['limit'] ?? 50)));
$offset = max(0, (int)($_GET['offset'] ?? 0));

$results = [];
$total   = 0;

$scanFolders = function(string $dir) {
  $items = is_dir($dir) ? scandir($dir) : [];
  return array_values(array_filter($items, fn($f) => $f !== '.' && $f !== '..'));
};

$folders = $folder ? [$folder] : $scanFolders($base);
sort($folders); // oldest->newest; reverse if you prefer

foreach ($folders as $f) {
  $dir = "$base/$f";
  if (!is_dir($dir)) continue;

  $files = $scanFolders($dir);
  sort($files);
  foreach ($files as $name) {
    $path = "$dir/$name";
    if (!is_file($path)) continue;

    $mime = finfo_file(finfo_open(FILEINFO_MIME_TYPE), $path);
    if (strpos($mime, 'image/') !== 0) continue;

    $url  = sprintf('%s/lovable-uploads/%s/%s',
      (isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'],
      rawurlencode($f),
      rawurlencode($name)
    );

    $results[] = [
      'folder' => $f,
      'name'   => $name,
      'url'    => $url,
      'bytes'  => filesize($path),
      'mtime'  => filemtime($path),
      'mime'   => $mime,
    ];
  }
}

$total = count($results);
$results = array_slice($results, $offset, $limit);

header('Content-Type: application/json');
echo json_encode(['ok' => true, 'total' => $total, 'items' => $results]);
