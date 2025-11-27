<?php
define('API_ACCESS', true);
require_once '_bootstrap.php';

header('Content-Type: application/json');
setCorsHeaders();

// GET request - list all listings (admin only)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Verify authentication for admin
    $token = getBearerToken();
    if ($token) {
        $userData = verifyToken($token);
        if (!$userData) {
            http_response_code(401);
            jsonResponse(['success' => false, 'error' => 'Invalid token']);
            exit; // Ensure execution stops here
        }
    }
    
    try {
        $pdo = getDbConnection();
        
        // Get filter parameters
        $status = $_GET['status'] ?? null;
        $category = $_GET['category'] ?? null;
        $featured = $_GET['featured'] ?? null;
        $limit = intval($_GET['limit'] ?? 100);
        $offset = intval($_GET['offset'] ?? 0);
        
        // Build query
        $where = [];
        $params = [];
        
        if ($status) {
            $where[] = "listing_status = ?";
            $params[] = $status;
        }
        
        if ($category) {
            $where[] = "property_category = ?";
            $params[] = $category;
        }
        
        if ($featured !== null) {
            $where[] = "is_featured = ?";
            $params[] = intval($featured);
        }
        
        $whereClause = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';
        
        // Get total count
        $countSql = "SELECT COUNT(*) as total FROM listings $whereClause";
        $countStmt = $pdo->prepare($countSql);
        $countStmt->execute($params);
        $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Get listings
        $sql = "SELECT 
                    id, slug, title, summary, price, currency,
                    address, city, state, bedrooms, bathrooms, size_sqft,
                    property_type, property_category, status, listing_status,
                    cover_image, gallery, features, is_featured, sort_order,
                    created_at, updated_at
                FROM listings 
                $whereClause 
                ORDER BY is_featured DESC, created_at DESC 
                LIMIT ? OFFSET ?";
        
        $params[] = $limit;
        $params[] = $offset;
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $listings = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Parse JSON fields
        foreach ($listings as &$listing) {
            $listing['gallery'] = json_decode($listing['gallery'] ?? '[]', true);
            $listing['features'] = json_decode($listing['features'] ?? '[]', true);
            $listing['is_featured'] = (bool)$listing['is_featured'];
            $listing['price'] = floatval($listing['price']);
            $listing['bedrooms'] = intval($listing['bedrooms']);
            $listing['bathrooms'] = intval($listing['bathrooms']);
            $listing['size_sqft'] = intval($listing['size_sqft']);
        }
        
        jsonResponse([
            'success' => true,
            'listings' => $listings,
            'total' => intval($total),
            'limit' => $limit,
            'offset' => $offset
        ]);
        
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        http_response_code(500);
        jsonResponse(['success' => false, 'error' => 'Database error']);
    }
}

// Public endpoint for featured/published listings
if ($_SERVER['REQUEST_METHOD'] === 'GET' && !isset($_GET['admin'])) {
    try {
        $pdo = getDbConnection();
        
        $sql = "SELECT 
                    id, slug, title, summary, price, currency,
                    address, city, state, bedrooms, bathrooms, size_sqft,
                    property_type, property_category, cover_image, is_featured,
                    created_at
                FROM listings 
                WHERE listing_status = 'active'
                ORDER BY is_featured DESC, created_at DESC 
                LIMIT 50";
        
        $stmt = $pdo->query($sql);
        $listings = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Parse JSON fields and format data
        foreach ($listings as &$listing) {
            $listing['is_featured'] = (bool)$listing['is_featured'];
            $listing['price'] = floatval($listing['price']);
            $listing['bedrooms'] = intval($listing['bedrooms']);
            $listing['bathrooms'] = intval($listing['bathrooms']);
            $listing['size_sqft'] = intval($listing['size_sqft']);
        }
        
        jsonResponse([
            'success' => true,
            'listings' => $listings
        ]);
        
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        http_response_code(500);
        jsonResponse(['success' => false, 'error' => 'Database error']);
    }
}
