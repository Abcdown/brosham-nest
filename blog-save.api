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
    $required = ['title', 'content'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            http_response_code(400);
            jsonResponse(['success' => false, 'error' => "Missing required field: $field"]);
        }
    }
    
    $pdo = getDbConnection();
    
    // Check if updating existing post
    $id = $input['id'] ?? null;
    $isUpdate = false;
    
    if ($id) {
        // Check if post exists
        $stmt = $pdo->prepare("SELECT id FROM blog_posts WHERE id = ?");
        $stmt->execute([$id]);
        $isUpdate = $stmt->fetch() !== false;
    }
    
    // Generate ID and slug if new
    if (!$id) {
        $id = 'post_' . time() . '_' . bin2hex(random_bytes(4));
    }
    
    $slug = $input['slug'] ?? generateSlug($input['title']);
    
    // Check if slug is unique (excluding current post if updating)
    $slugCheckSql = $isUpdate 
        ? "SELECT id FROM blog_posts WHERE slug = ? AND id != ?"
        : "SELECT id FROM blog_posts WHERE slug = ?";
    $slugStmt = $pdo->prepare($slugCheckSql);
    $slugStmt->execute($isUpdate ? [$slug, $id] : [$slug]);
    
    if ($slugStmt->fetch()) {
        // Slug exists, make it unique
        $slug = $slug . '-' . substr(md5(microtime()), 0, 6);
    }
    
    // Prepare data
    $data = [
        'id' => $id,
        'slug' => $slug,
        'title' => $input['title'],
        'excerpt' => $input['excerpt'] ?? '',
        'content' => $input['content'],
        'cover_image' => $input['coverImage'] ?? null,
        'author_id' => $userData['id'],
        'author_name' => $userData['full_name'] ?? $userData['username'],
        'status' => $input['status'] ?? 'draft',
        'tags' => json_encode($input['tags'] ?? []),
        'is_featured' => isset($input['isFeatured']) ? intval($input['isFeatured']) : 0,
        'published_at' => ($input['status'] === 'published') ? date('Y-m-d H:i:s') : null,
    ];
    
    if ($isUpdate) {
        // Update existing post
        $sql = "UPDATE blog_posts SET 
                slug = ?, title = ?, excerpt = ?, content = ?, cover_image = ?,
                author_id = ?, author_name = ?, status = ?, tags = ?, is_featured = ?,
                published_at = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['slug'], $data['title'], $data['excerpt'], $data['content'],
            $data['cover_image'], $data['author_id'], $data['author_name'],
            $data['status'], $data['tags'], $data['is_featured'],
            $data['published_at'], $id
        ]);
        
        jsonResponse([
            'success' => true,
            'message' => 'Blog post updated successfully',
            'id' => $id,
            'action' => 'update'
        ]);
    } else {
        // Insert new post
        $sql = "INSERT INTO blog_posts 
                (id, slug, title, excerpt, content, cover_image, author_id, author_name,
                 status, tags, is_featured, published_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['id'], $data['slug'], $data['title'], $data['excerpt'],
            $data['content'], $data['cover_image'], $data['author_id'],
            $data['author_name'], $data['status'], $data['tags'],
            $data['is_featured'], $data['published_at']
        ]);
        
        jsonResponse([
            'success' => true,
            'message' => 'Blog post created successfully',
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
