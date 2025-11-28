<?php
require __DIR__ . '/_bootstrap.php';

// Public read is fine; if you want to protect it, call require_key();
$pdo = db();

$limit  = min(100, max(1, (int)($_GET['limit'] ?? 20)));
$offset = max(0, (int)($_GET['offset'] ?? 0));
$status = $_GET['status'] ?? 'published';

$stmt = $pdo->prepare("
  SELECT id, title, slug, price, location, bedrooms, bathrooms, area_sqft,
         description, is_featured, created_at, updated_at
  FROM listings
  WHERE status = ?
  ORDER BY created_at DESC
  LIMIT ? OFFSET ?
");
$stmt->bindValue(1, $status);
$stmt->bindValue(2, $limit,  PDO::PARAM_INT);
$stmt->bindValue(3, $offset, PDO::PARAM_INT);
$stmt->execute();

out(['ok' => true, 'items' => $stmt->fetchAll()]);
