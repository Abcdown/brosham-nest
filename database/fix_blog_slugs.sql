-- ============================================
-- Blog Slug Fixer SQL Script
-- Run this in phpMyAdmin SQL tab
-- ============================================

-- Step 1: Check current status
SELECT 
    '📊 Current Status' as info,
    COUNT(*) as total_posts,
    SUM(CASE WHEN slug IS NULL OR slug = '' THEN 1 ELSE 0 END) as missing_slugs,
    SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published_posts
FROM blog_posts;

-- Step 2: Show posts with missing or empty slugs
SELECT 
    '❌ Posts needing slugs:' as info,
    id, 
    title, 
    COALESCE(slug, '[NULL]') as current_slug, 
    status
FROM blog_posts 
WHERE slug IS NULL OR slug = ''
ORDER BY created_at DESC;

-- Step 3: Generate slugs for posts without them
-- This creates a slug from the title (lowercase, spaces to hyphens)
UPDATE blog_posts 
SET slug = LOWER(
    TRIM(
        REPLACE(
            REPLACE(
                REPLACE(
                    REPLACE(
                        REPLACE(
                            REPLACE(title, ' ', '-'),
                            '.', ''
                        ),
                        ',', ''
                    ),
                    '?', ''
                ),
                '!', ''
            ),
            '--', '-'
        )
    )
)
WHERE slug IS NULL OR slug = '';

-- Step 4: Make sure all slugs are unique
-- Add a unique suffix to any duplicate slugs
UPDATE blog_posts t1
INNER JOIN (
    SELECT slug, COUNT(*) as cnt
    FROM blog_posts
    GROUP BY slug
    HAVING cnt > 1
) t2 ON t1.slug = t2.slug
SET t1.slug = CONCAT(t1.slug, '-', SUBSTRING(MD5(t1.id), 1, 6))
WHERE t1.id NOT IN (
    SELECT * FROM (
        SELECT MIN(id)
        FROM blog_posts
        GROUP BY slug
    ) as temp
);

-- Step 5: Verify the fix
SELECT 
    '✅ Verification Results' as info,
    COUNT(*) as total_posts,
    SUM(CASE WHEN slug IS NULL OR slug = '' THEN 1 ELSE 0 END) as still_missing_slugs,
    COUNT(DISTINCT slug) as unique_slugs
FROM blog_posts;

-- Step 6: Show all posts with their slugs
SELECT 
    '📋 All Posts' as info,
    CASE 
        WHEN status = 'published' THEN '✓'
        ELSE '○'
    END as published,
    title,
    slug,
    status,
    id
FROM blog_posts
ORDER BY created_at DESC;

-- ============================================
-- Expected Results:
-- 1. First query shows how many posts need fixing
-- 2. Second query lists the problematic posts
-- 3. Third query fixes the missing slugs
-- 4. Fourth query ensures slugs are unique
-- 5. Fifth query confirms everything is fixed
-- 6. Sixth query shows all posts with their new slugs
-- ============================================
