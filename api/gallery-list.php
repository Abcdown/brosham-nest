<?php
// api/gallery-list.php
// Get all gallery images with optional filtering

define('API_ACCESS', true);
require_once 'config.php';
require_once '_bootstrap.php';

try {
    $pdo = getDbConnection();
    
    // Get query parameters
    $status = $_GET['status'] ?? 'active';
    $category = $_GET['category'] ?? null;
    $featured = isset($_GET['featured']) ? (bool)$_GET['featured'] : null;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 100;
    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
    
    // Build query
    $sql = "SELECT * FROM gallery WHERE 1=1";
    $params = [];
    
    // Add filters
    if ($status && $status !== 'all') {
        $sql .= " AND status = :status";
        $params[':status'] = $status;
    }
    
    if ($category && $category !== 'all') {
        $sql .= " AND category = :category";
        $params[':category'] = $category;
    }
    
    if ($featured !== null) {
        $sql .= " AND is_featured = :featured";
        $params[':featured'] = $featured ? 1 : 0;
    }
    
    // Order by display_order, then by created_at DESC
    $sql .= " ORDER BY display_order ASC, created_at DESC";
    
    // Add pagination
    $sql .= " LIMIT :limit OFFSET :offset";
    
    $stmt = $pdo->prepare($sql);
    
    // Bind parameters
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    
    $stmt->execute();
    $images = $stmt->fetchAll();
    
    // Get total count
    $countSql = "SELECT COUNT(*) as total FROM gallery WHERE 1=1";
    if ($status && $status !== 'all') {
        $countSql .= " AND status = :status";
    }
    if ($category && $category !== 'all') {
        $countSql .= " AND category = :category";
    }
    if ($featured !== null) {
        $countSql .= " AND is_featured = :featured";
    }
    
    $countStmt = $pdo->prepare($countSql);
    foreach ($params as $key => $value) {
        if ($key !== ':limit' && $key !== ':offset') {
            $countStmt->bindValue($key, $value);
        }
    }
    $countStmt->execute();
    $totalCount = $countStmt->fetch()['total'];
    
    // Get unique categories
    $categoriesStmt = $pdo->query("SELECT DISTINCT category FROM gallery WHERE status = 'active' ORDER BY category");
    $categories = $categoriesStmt->fetchAll(PDO::FETCH_COLUMN);
    
    jsonResponse([
        'success' => true,
        'images' => $images,
        'categories' => $categories,
        'total' => (int)$totalCount,
        'limit' => $limit,
        'offset' => $offset
    ]);
    
} catch (PDOException $e) {
    error_log("Gallery list error: " . $e->getMessage());
    jsonResponse([
        'success' => false,
        'error' => 'Failed to fetch gallery images'
    ], 500);
}
