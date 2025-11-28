<?php
define('API_ACCESS', true);
require_once '_bootstrap.php';

header('Content-Type: application/json');
setCorsHeaders();

// Check authentication
$isAuthenticated = false;
$token = getBearerToken();

if ($token) {
    $userData = verifyToken($token);
    if ($userData) {
        $isAuthenticated = true;
    }
}

try {
    $pdo = getDbConnection();
    
    // Admin authenticated request - return all posts
    if ($isAuthenticated && $_SERVER['REQUEST_METHOD'] === 'GET') {
        $status = $_GET['status'] ?? null;
        $limit = intval($_GET['limit'] ?? 100);
        $offset = intval($_GET['offset'] ?? 0);
        
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
        
        // Get posts
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
        
        // Transform data
        foreach ($posts as &$post) {
            $post['tags'] = json_decode($post['tags'] ?? '[]', true);
            $post['is_featured'] = (bool)$post['is_featured'];
            $post['views'] = intval($post['views']);
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
        exit;
    }
    
    // Public unauthenticated request - ONLY published posts
    if (!$isAuthenticated && $_SERVER['REQUEST_METHOD'] === 'GET') {
        $sql = "SELECT 
                    id, slug, title, excerpt, cover_image,
                    author_name, published_at, views, tags, content
                FROM blog_posts 
                WHERE status = 'published'
                ORDER BY published_at DESC, created_at DESC 
                LIMIT 50";
        
        $stmt = $pdo->query($sql);
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        error_log('[blog-list.php] Public request - Found ' . count($posts) . ' published posts');
        
        // Transform data
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
        exit;
    }
    
} catch (PDOException $e) {
    error_log("Database error in blog-list.php: " . $e->getMessage());
    http_response_code(500);
    jsonResponse(['success' => false, 'error' => 'Database error']);
    exit;
}

// If we reach here, method not allowed
http_response_code(405);
jsonResponse(['success' => false, 'error' => 'Method not allowed']);
