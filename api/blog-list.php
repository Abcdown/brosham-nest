<?php
define('API_ACCESS', true);
require_once '_bootstrap.php';

header('Content-Type: application/json');
setCorsHeaders();

// GET request - list all blog posts (admin only)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Verify authentication for admin
    $token = getBearerToken();
    if ($token) {
        $userData = verifyToken($token);
        if (!$userData) {
            http_response_code(401);
            jsonResponse(['success' => false, 'error' => 'Invalid token']);
            exit;
        }
    }
    
    try {
        $pdo = getDbConnection();
        
        // Get filter parameters
        $status = $_GET['status'] ?? null;
        $limit = intval($_GET['limit'] ?? 100);
        $offset = intval($_GET['offset'] ?? 0);
        
        // Build query
        $where = [];
        $params = [];
        
        if ($status) {
            $where[] = "status = ?";
            $params[] = $status;
        }
        
        $whereClause = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';
        
        // Get total count
        $countSql = "SELECT COUNT(*) as total FROM blog_posts $whereClause";
        $countStmt = $pdo->prepare($countSql);
        $countStmt->execute($params);
        $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Get blog posts
        $sql = "SELECT 
                    id, slug, title, excerpt, content, cover_image,
                    author_id, author_name, status, tags, views,
                    is_featured, published_at, created_at, updated_at
                FROM blog_posts 
                $whereClause 
                ORDER BY created_at DESC 
                LIMIT ? OFFSET ?";
        
        $params[] = $limit;
        $params[] = $offset;
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Parse JSON fields and transform to camelCase
        foreach ($posts as &$post) {
            $post['tags'] = json_decode($post['tags'] ?? '[]', true);
            $post['is_featured'] = (bool)$post['is_featured'];
            $post['views'] = intval($post['views']);
            
            // Transform to camelCase
            $post['coverImage'] = $post['cover_image'];
            $post['authorId'] = $post['author_id'];
            $post['authorName'] = $post['author_name'];
            $post['isFeatured'] = $post['is_featured'];
            $post['publishedAt'] = $post['published_at'];
            $post['createdAt'] = $post['created_at'];
            $post['updatedAt'] = $post['updated_at'];
        }
        
        jsonResponse([
            'success' => true,
            'posts' => $posts,
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

// Public endpoint for published posts
if ($_SERVER['REQUEST_METHOD'] === 'GET' && !isset($_GET['admin'])) {
    try {
        $pdo = getDbConnection();
        
        $sql = "SELECT 
                    id, slug, title, excerpt, cover_image,
                    author_name, published_at, views, tags
                FROM blog_posts 
                WHERE status = 'published'
                ORDER BY published_at DESC, created_at DESC 
                LIMIT 50";
        
        $stmt = $pdo->query($sql);
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Transform to camelCase
        foreach ($posts as &$post) {
            $post['tags'] = json_decode($post['tags'] ?? '[]', true);
            $post['views'] = intval($post['views']);
            $post['coverImage'] = $post['cover_image'];
            $post['authorName'] = $post['author_name'];
            $post['publishedAt'] = $post['published_at'];
        }
        
        jsonResponse([
            'success' => true,
            'posts' => $posts
        ]);
        
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        http_response_code(500);
        jsonResponse(['success' => false, 'error' => 'Database error']);
    }
}
