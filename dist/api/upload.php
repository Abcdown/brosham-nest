<?php
declare(strict_types=1);

// ---------- CONFIG ----------
$API_KEY         = 'xHJKpGmIpLHOouWkVddnbdOUN6hEjYnx8slpXSbvKzBvvlo6ly'; // same key as ping.php
$MAX_BYTES       = 10 * 1024 * 1024; // 10 MB (fits under your 16 MB PHP caps)
$ALLOWED_MIMES   = ['image/jpeg','image/png','image/webp','image/gif'];
$UPLOAD_DIR      = rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/lovable-uploads';

// ---------- CORS ----------
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$site   = 'https://staging.broshamproperties.my';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . $site);
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-API-Key');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// ---------- Auth ----------
$provided = $_GET['key'] ?? $_SERVER['HTTP_X_API_KEY'] ?? '';
if (!hash_equals($API_KEY, $provided)) {
  http_response_code(401);
  echo json_encode(['ok'=>false,'error'=>'invalid_key']); exit;
}

// ---------- Basic checks ----------
if (!isset($_FILES['photo'])) {
  http_response_code(400);
  echo json_encode(['ok'=>false,'error'=>'missing_file_field_photo']); exit;
}
$file = $_FILES['photo'];

if ($file['error'] !== UPLOAD_ERR_OK) {
  http_response_code(400);
  echo json_encode(['ok'=>false,'error'=>'upload_error','code'=>$file['error']]); exit;
}

if ($file['size'] > $MAX_BYTES) {
  http_response_code(413);
  echo json_encode(['ok'=>false,'error'=>'file_too_large','max_bytes'=>$MAX_BYTES]); exit;
}

// ---------- Detect MIME (fileinfo) ----------
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime  = $finfo->file($file['tmp_name']) ?: 'application/octet-stream';

if (!in_array($mime, $ALLOWED_MIMES, true)) {
  http_response_code(415);
  echo json_encode(['ok'=>false,'error'=>'unsupported_type','mime'=>$mime]); exit;
}

// ---------- Make dated subfolder ----------
$day = date('Y-m-d');
$targetDir = $UPLOAD_DIR . '/' . $day;
if (!is_dir($targetDir)) {
  if (!mkdir($targetDir, 0755, true)) {
    http_response_code(500);
    echo json_encode(['ok'=>false,'error'=>'mkdir_failed']); exit;
  }
}

// ---------- Safe unique name ----------
$extFromMime = match ($mime) {
  'image/jpeg' => 'jpg',
  'image/png'  => 'png',
  'image/webp' => 'webp',
  'image/gif'  => 'gif',
  default      => 'bin',
};
$base   = bin2hex(random_bytes(8));
$fname  = $base . '.' . $extFromMime;
$target = $targetDir . '/' . $fname;

// ---------- Move ----------
if (!move_uploaded_file($file['tmp_name'], $target)) {
  http_response_code(500);
  echo json_encode(['ok'=>false,'error'=>'move_failed']); exit;
}

// ---------- Collect basic meta ----------
[$width,$height] = @getimagesize($target) ?: [null,null];
$publicUrl = $site . '/lovable-uploads/' . rawurlencode($day) . '/' . rawurlencode($fname);

echo json_encode([
  'ok'      => true,
  'url'     => $publicUrl,
  'name'    => $fname,
  'folder'  => $day,
  'bytes'   => filesize($target),
  'mime'    => $mime,
  'width'   => $width,
  'height'  => $height,
], JSON_UNESCAPED_SLASHES);
