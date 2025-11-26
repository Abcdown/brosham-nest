<?php
define('API_ACCESS', true);
require_once '_bootstrap.php';

header('Content-Type: application/json');
setCorsHeaders();

// Verify authentication
$token = getBearerToken();
if (!$token) {
    http_response_code(401);
    jsonResponse(['success' => false, 'error' => 'No token provided']);
}

$userData = verifyToken($token);
if (!$userData) {
    http_response_code(401);
    jsonResponse(['success' => false, 'error' => 'Invalid token']);
}

// Only handle POST for create/update
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    jsonResponse(['success' => false, 'error' => 'Method not allowed']);
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    $required = ['title', 'price'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            http_response_code(400);
            jsonResponse(['success' => false, 'error' => "Missing required field: $field"]);
        }
    }
    
    $pdo = getDbConnection();
    
    // Check if updating existing listing
    $id = $input['id'] ?? null;
    $isUpdate = false;
    
    if ($id) {
        // Check if listing exists
        $stmt = $pdo->prepare("SELECT id FROM listings WHERE id = ?");
        $stmt->execute([$id]);
        $isUpdate = $stmt->fetch() !== false;
    }
    
    // Generate ID and slug if new
    if (!$id) {
        $id = 'ls_' . time() . '_' . bin2hex(random_bytes(4));
    }
    
    $slug = $input['slug'] ?? generateSlug($input['title']);
    
    // Prepare data
    $data = [
        'id' => $id,
        'slug' => $slug,
        'title' => $input['title'],
        'summary' => $input['summary'] ?? '',
        'price' => floatval($input['price']),
        'currency' => $input['currency'] ?? 'RM',
        'address' => $input['address'] ?? '',
        'city' => $input['city'] ?? '',
        'state' => $input['state'] ?? '',
        'bedrooms' => intval($input['bedrooms'] ?? 0),
        'bathrooms' => intval($input['bathrooms'] ?? 0),
        'size_sqft' => intval($input['sizeSqft'] ?? 0),
        'property_type' => $input['propertyType'] ?? '',
        'property_category' => $input['propertyCategory'] ?? '',
        'status' => $input['status'] ?? 'for-sale',
        'listing_status' => $input['listingStatus'] ?? 'active',
        'cover_image' => $input['coverImage'] ?? ($input['cover']['url'] ?? null),
        'gallery' => json_encode($input['gallery'] ?? []),
        'features' => json_encode($input['features'] ?? []),
        'is_featured' => isset($input['isFeatured']) ? intval($input['isFeatured']) : 0,
        'sort_order' => intval($input['sortOrder'] ?? 0),
    ];
    
    if ($isUpdate) {
        // Update existing listing
        $sql = "UPDATE listings SET 
                slug = ?, title = ?, summary = ?, price = ?, currency = ?,
                address = ?, city = ?, state = ?, bedrooms = ?, bathrooms = ?,
                size_sqft = ?, property_type = ?, property_category = ?,
                status = ?, listing_status = ?, cover_image = ?, gallery = ?,
                features = ?, is_featured = ?, sort_order = ?,
                updated_at = CURRENT_TIMESTAMP
                WHERE id = ?";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['slug'], $data['title'], $data['summary'], $data['price'], $data['currency'],
            $data['address'], $data['city'], $data['state'], $data['bedrooms'], $data['bathrooms'],
            $data['size_sqft'], $data['property_type'], $data['property_category'],
            $data['status'], $data['listing_status'], $data['cover_image'], $data['gallery'],
            $data['features'], $data['is_featured'], $data['sort_order'],
            $id
        ]);
        
        jsonResponse([
            'success' => true,
            'message' => 'Listing updated successfully',
            'id' => $id,
            'action' => 'update'
        ]);
    } else {
        // Insert new listing
        $sql = "INSERT INTO listings 
                (id, slug, title, summary, price, currency, address, city, state,
                 bedrooms, bathrooms, size_sqft, property_type, property_category,
                 status, listing_status, cover_image, gallery, features, is_featured, sort_order)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['id'], $data['slug'], $data['title'], $data['summary'], $data['price'],
            $data['currency'], $data['address'], $data['city'], $data['state'],
            $data['bedrooms'], $data['bathrooms'], $data['size_sqft'],
            $data['property_type'], $data['property_category'], $data['status'],
            $data['listing_status'], $data['cover_image'], $data['gallery'],
            $data['features'], $data['is_featured'], $data['sort_order']
        ]);
        
        jsonResponse([
            'success' => true,
            'message' => 'Listing created successfully',
            'id' => $id,
            'action' => 'create'
        ]);
    }
    
} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    jsonResponse(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    http_response_code(500);
    jsonResponse(['success' => false, 'error' => $e->getMessage()]);
}

function generateSlug($title) {
    $slug = strtolower(trim($title));
    $slug = preg_replace('/[^a-z0-9-]/', '-', $slug);
    $slug = preg_replace('/-+/', '-', $slug);
    return trim($slug, '-');
}
