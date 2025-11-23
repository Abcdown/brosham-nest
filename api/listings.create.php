<?php
require __DIR__ . '/_bootstrap.php';
require_key();

$in = json_input();

$title = trim($in['title'] ?? '');
if ($title === '') {
  http_response_code(422);
  out(['ok' => false, 'error' => 'title is required']);
}

// Tiny slug generator
$slug = strtolower(preg_replace('/[^a-z0-9]+/', '-', $title));
$slug = trim($slug, '-');

$pdo = db();
$stmt = $pdo->prepare("
  INSERT INTO listings (title, slug, price, location, bedrooms, bathrooms, area_sqft, description, status, is_featured)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");
$stmt->execute([
  $title,
  $slug,
  $in['price'] ?? null,
  $in['location'] ?? null,
  $in['bedrooms'] ?? null,
  $in['bathrooms'] ?? null,
  $in['area_sqft'] ?? null,
  $in['description'] ?? null,
  $in['status'] ?? 'draft',
  $in['is_featured'] ?? 0,
]);

$id = (int)$pdo->lastInsertId();
out(['ok' => true, 'id' => $id, 'slug' => $slug]);
