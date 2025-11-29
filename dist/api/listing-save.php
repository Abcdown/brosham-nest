<?php
// /api/listing-save.php
header('Content-Type: application/json');

// --------- 1) Auth ----------
$expectedKey = getenv('BP_API_KEY'); // optionally: 'your-hardcoded-key-here'
$key = $_GET['key'] ?? '';
if (!$key || ($expectedKey && $key !== $expectedKey)) {
  http_response_code(403);
  echo json_encode(['ok' => false, 'error' => 'Forbidden']);
  exit;
}

// --------- 2) Read & validate payload ----------
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

// If cover missing, default to first gallery item - Newly Added
if ((!isset($data['cover']) || !$data['cover']) && isset($data['gallery'][0]['url'])) {
  $data['cover'] = ['url' => $data['gallery'][0]['url']];
}

if (!$data || !is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Invalid JSON body']);
  exit;
}

$required = ['id', 'slug', 'title'];
foreach ($required as $f) {
  if (!isset($data[$f]) || $data[$f] === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => "Missing field: $f"]);
    exit;
  }
}

// normalise some fields
$data['status'] = $data['status'] ?? 'draft';                  // 'draft' | 'published'
$data['createdAt'] = $data['createdAt'] ?? gmdate('c');
$data['updatedAt'] = gmdate('c');

// --------- 3) Ensure folder exists ----------
$root = realpath(__DIR__ . '/..'); // /staging.broshamproperties.my
$base = $root . '/lovable-uploads/listings/by-id';
if (!is_dir($base)) {
  @mkdir($base, 0775, true);
}

// --------- 4) Build safe filename ----------
$id = preg_replace('/[^a-zA-Z0-9_-]/', '', $data['id']);
$filePath = $base . '/' . $id . '.json';

// --------- 5) Atomic write with flock ----------
$fp = fopen($filePath, 'c+');         // create if not exists
if (!$fp) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Cannot open file for write']);
  exit;
}
flock($fp, LOCK_EX);
ftruncate($fp, 0);
fwrite($fp, json_encode($data, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
fflush($fp);
flock($fp, LOCK_UN);
fclose($fp);

// --------- 6) Update indexes (index.json / drafts.json) ----------
$listsRoot = realpath(__DIR__ . '/..') . '/lovable-uploads/listings';
@mkdir($listsRoot, 0775, true);

$indexPath  = $listsRoot . '/index.json';
$draftsPath = $listsRoot . '/drafts.json';
if (!file_exists($indexPath))  file_put_contents($indexPath,  "[]");
if (!file_exists($draftsPath)) file_put_contents($draftsPath, "[]");

// load, remove old entry
$index  = json_decode(file_get_contents($indexPath), true) ?: [];
$drafts = json_decode(file_get_contents($draftsPath), true) ?: [];
$index  = array_values(array_filter($index,  fn($x) => ($x['id'] ?? '') !== $data['id']));
$drafts = array_values(array_filter($drafts, fn($x) => ($x['id'] ?? '') !== $data['id']));

// lite list item
$lite = [
  'id'        => $data['id'],
  'slug'      => $data['slug'],
  'title'     => $data['title'],
  'summary'   => $data['summary'] ?? '',
  'price'     => $data['price'] ?? 0,
  'currency'  => $data['currency'] ?? 'RM',
  'address'   => $data['address'] ?? '',
  'bedrooms'  => $data['bedrooms'] ?? null,
  'bathrooms' => $data['bathrooms'] ?? null,
  'sizeSqft'  => $data['sizeSqft'] ?? null,
  'cover'     => $data['cover'] ?? null, // { url }
  'createdAt' => $data['createdAt'],
  'updatedAt' => $data['updatedAt'],
  'status'    => $data['status'] ?? 'draft'
];

if (($data['status'] ?? 'draft') === 'published') {
  $index[] = $lite;
} else {
  $drafts[] = $lite;
}

file_put_contents($indexPath,  json_encode($index,  JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
file_put_contents($draftsPath, json_encode($drafts, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));


// --------- 6) Respond ----------
echo json_encode(['ok' => true, 'id' => $id, 'path' => $filePath]);
