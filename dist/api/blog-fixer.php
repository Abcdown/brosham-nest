<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Slug Fixer</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: #f5f5f5;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1 { color: #333; margin-bottom: 10px; }
        .subtitle { color: #666; margin-bottom: 30px; }
        .buttons {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
        }
        button {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s;
        }
        .btn-primary {
            background: #2563eb;
            color: white;
        }
        .btn-primary:hover {
            background: #1d4ed8;
        }
        .btn-success {
            background: #16a34a;
            color: white;
        }
        .btn-success:hover {
            background: #15803d;
        }
        .status {
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
            display: none;
        }
        .status.success {
            background: #d1fae5;
            border: 1px solid #16a34a;
            color: #15803d;
        }
        .status.error {
            background: #fee2e2;
            border: 1px solid #dc2626;
            color: #991b1b;
        }
        .status.info {
            background: #dbeafe;
            border: 1px solid #2563eb;
            color: #1e40af;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }
        th {
            background: #f9fafb;
            font-weight: 600;
            color: #374151;
        }
        tr:hover {
            background: #f9fafb;
        }
        .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
        }
        .badge.published {
            background: #d1fae5;
            color: #15803d;
        }
        .badge.draft {
            background: #f3f4f6;
            color: #6b7280;
        }
        .slug-missing {
            background: #fee2e2;
            padding: 4px 8px;
            border-radius: 4px;
            color: #991b1b;
            font-weight: 500;
        }
        .loading {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid #e5e7eb;
            border-top-color: #2563eb;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            padding: 20px;
            background: #f9fafb;
            border-radius: 6px;
            border-left: 4px solid #2563eb;
        }
        .stat-value {
            font-size: 32px;
            font-weight: 700;
            color: #2563eb;
            margin-bottom: 5px;
        }
        .stat-label {
            color: #6b7280;
            font-size: 14px;
        }
        pre {
            background: #1f2937;
            color: #f9fafb;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 13px;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔧 Blog Slug Fixer</h1>
        <p class="subtitle">Check and fix missing or invalid blog post slugs</p>

        <div class="buttons">
            <button class="btn-primary" onclick="checkPosts()">
                <span id="checkBtn">Check All Posts</span>
            </button>
            <button class="btn-success" onclick="fixSlugs()">
                <span id="fixBtn">Fix Missing Slugs</span>
            </button>
        </div>

        <div id="status" class="status"></div>

        <div id="stats" class="stats" style="display: none;">
            <div class="stat-card">
                <div class="stat-value" id="totalPosts">0</div>
                <div class="stat-label">Total Posts</div>
            </div>
            <div class="stat-card">
                <div class="stat-value" id="publishedPosts">0</div>
                <div class="stat-label">Published</div>
            </div>
            <div class="stat-card">
                <div class="stat-value" id="missingSlugs">0</div>
                <div class="stat-label">Missing Slugs</div>
            </div>
        </div>

        <div id="results"></div>
    </div>

    <script>
        const API_BASE = '/api';

        function showStatus(message, type = 'info') {
            const status = document.getElementById('status');
            status.textContent = message;
            status.className = `status ${type}`;
            status.style.display = 'block';
            
            if (type === 'success') {
                setTimeout(() => {
                    status.style.display = 'none';
                }, 5000);
            }
        }

        async function checkPosts() {
            const btn = document.getElementById('checkBtn');
            btn.innerHTML = '<span class="loading"></span> Checking...';
            
            showStatus('Fetching blog posts...', 'info');

            try {
                const response = await fetch(`${API_BASE}/blog-debug.php`);
                const data = await response.json();

                if (!data.success) {
                    showStatus('Error: ' + data.error, 'error');
                    return;
                }

                const posts = data.posts;
                const totalPosts = posts.length;
                const publishedPosts = posts.filter(p => p.status === 'published').length;
                const missingSlugs = posts.filter(p => !p.slug || p.slug === '').length;

                // Update stats
                document.getElementById('totalPosts').textContent = totalPosts;
                document.getElementById('publishedPosts').textContent = publishedPosts;
                document.getElementById('missingSlugs').textContent = missingSlugs;
                document.getElementById('stats').style.display = 'grid';

                // Show results table
                let html = '<h2 style="margin: 20px 0;">Blog Posts</h2>';
                html += '<table>';
                html += '<thead><tr><th>Title</th><th>Slug</th><th>Status</th><th>ID</th></tr></thead>';
                html += '<tbody>';

                posts.forEach(post => {
                    const slugDisplay = post.slug ? 
                        post.slug : 
                        '<span class="slug-missing">❌ Missing</span>';
                    
                    const statusBadge = `<span class="badge ${post.status}">${post.status}</span>`;
                    
                    html += `<tr>
                        <td><strong>${post.title}</strong></td>
                        <td>${slugDisplay}</td>
                        <td>${statusBadge}</td>
                        <td><code>${post.id}</code></td>
                    </tr>`;
                });

                html += '</tbody></table>';

                if (missingSlugs > 0) {
                    html += `<div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
                        <strong>⚠️ Warning:</strong> ${missingSlugs} post(s) have missing slugs. Click "Fix Missing Slugs" to auto-generate them.
                    </div>`;
                }

                document.getElementById('results').innerHTML = html;
                showStatus(`Found ${totalPosts} posts. ${missingSlugs > 0 ? missingSlugs + ' need fixing.' : 'All posts have slugs!'}`, 
                    missingSlugs > 0 ? 'info' : 'success');

            } catch (error) {
                showStatus('Error: ' + error.message, 'error');
                console.error(error);
            } finally {
                btn.textContent = 'Check All Posts';
            }
        }

        async function fixSlugs() {
            if (!confirm('This will generate slugs for all posts that are missing them. Continue?')) {
                return;
            }

            const btn = document.getElementById('fixBtn');
            btn.innerHTML = '<span class="loading"></span> Fixing...';
            
            showStatus('Fixing missing slugs...', 'info');

            try {
                const response = await fetch(`${API_BASE}/fix-blog-slugs.php`);
                const text = await response.text();
                
                // Show the output in a preformatted block
                document.getElementById('results').innerHTML = '<h2>Fix Results</h2><pre>' + text + '</pre>';
                
                showStatus('✅ Slugs fixed successfully! Refresh the page to see updated data.', 'success');
                
                // Auto-refresh after 2 seconds
                setTimeout(() => {
                    checkPosts();
                }, 2000);

            } catch (error) {
                showStatus('Error: ' + error.message, 'error');
                console.error(error);
            } finally {
                btn.textContent = 'Fix Missing Slugs';
            }
        }

        // Auto-check on page load
        window.addEventListener('load', () => {
            setTimeout(checkPosts, 500);
        });
    </script>
</body>
</html>
