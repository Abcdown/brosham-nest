<?php
// Fix missing slugs in blog_posts table
// This script will generate slugs for any posts that don't have them

define('API_ACCESS', true);
require_once '_bootstrap.php';

function generateSlug($title) {
    $slug = strtolower(trim($title));
    // Remove special characters
    $slug = preg_replace('/[^a-z0-9\s-]/', '', $slug);
    // Replace spaces with hyphens
    $slug = preg_replace('/\s+/', '-', $slug);
    // Remove multiple hyphens
    $slug = preg_replace('/-+/', '-', $slug);
    return trim($slug, '-');
}

try {
    $pdo = getDbConnection();
    
    // Find posts with NULL or empty slugs
    $stmt = $pdo->query("SELECT id, title, slug FROM blog_posts WHERE slug IS NULL OR slug = ''");
    $postsNeedingSlugs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "Found " . count($postsNeedingSlugs) . " posts with missing slugs\n\n";
    
    $updated = 0;
    foreach ($postsNeedingSlugs as $post) {
        $newSlug = generateSlug($post['title']);
        
        // Check if slug already exists
        $checkStmt = $pdo->prepare("SELECT COUNT(*) FROM blog_posts WHERE slug = ?");
        $checkStmt->execute([$newSlug]);
        $count = $checkStmt->fetchColumn();
        
        // Make slug unique if needed
        if ($count > 0) {
            $newSlug = $newSlug . '-' . substr(md5($post['id']), 0, 6);
        }
        
        // Update the post
        $updateStmt = $pdo->prepare("UPDATE blog_posts SET slug = ? WHERE id = ?");
        $updateStmt->execute([$newSlug, $post['id']]);
        
        echo "Updated post '{$post['title']}' (ID: {$post['id']})\n";
        echo "  Old slug: " . ($post['slug'] ?: '[empty]') . "\n";
        echo "  New slug: {$newSlug}\n\n";
        
        $updated++;
    }
    
    echo "\n✅ Successfully updated {$updated} posts\n";
    
    // Show all posts with their slugs
    echo "\n📋 All blog posts:\n";
    echo str_repeat('-', 80) . "\n";
    
    $allStmt = $pdo->query("SELECT id, slug, title, status FROM blog_posts ORDER BY created_at DESC");
    $allPosts = $allStmt->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($allPosts as $post) {
        $statusBadge = $post['status'] === 'published' ? '✓' : '○';
        echo "{$statusBadge} {$post['title']}\n";
        echo "   ID: {$post['id']} | Slug: {$post['slug']}\n\n";
    }
    
} catch (PDOException $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
