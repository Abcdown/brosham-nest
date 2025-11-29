import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BlogAPI, type BlogPost } from "@/lib/blogApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

const AdminBlogForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [postId, setPostId] = useState<string | undefined>(id);
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [isFeatured, setIsFeatured] = useState(false);
  const [tags, setTags] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isEditMode && id) {
      loadPost(id);
    }
  }, [id, isEditMode]);

  const loadPost = async (postId: string) => {
    try {
      setIsLoading(true);
      const response = await BlogAPI.getAll();
      const post = response.posts.find(p => p.id === postId);
      
      if (!post) {
        toast({
          title: "Error",
          description: "Blog post not found",
          variant: "destructive",
        });
        navigate('/admin/blog');
        return;
      }
      
      setTitle(post.title || "");
      setSlug(post.slug || "");
      setCoverImageUrl(post.coverImage || "");
      setExcerpt(post.excerpt || "");
      setContent(post.content || "");
      setStatus(post.status || "draft");
      setIsFeatured(post.isFeatured || false);
      setTags(post.tags?.join(', ') || "");
      
    } catch (error: any) {
      console.error("Error loading post:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to load blog post",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async (publishNow = false) => {
    setIsSaving(true);

    if (!title.trim()) {
      toast({
        title: "Validation Error",
        description: "Title is required",
        variant: "destructive",
      });
      setIsSaving(false);
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Validation Error",
        description: "Content is required",
        variant: "destructive",
      });
      setIsSaving(false);
      return;
    }

    try {
      const finalId = postId || `post_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
      const finalSlug = slug.trim() || generateSlug(title);
      
      const postData: Partial<BlogPost> = {
        id: finalId,
        slug: finalSlug,
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        coverImage: coverImageUrl.trim() || null,
        status: publishNow ? "published" : status,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        isFeatured: isFeatured,
      };

      await BlogAPI.save(postData);
      
      toast({
        title: isEditMode ? "Post updated!" : "Post created!",
        description: isEditMode 
          ? "Your blog post has been successfully updated."
          : publishNow
            ? "Your blog post has been successfully published."
            : "Your blog post has been saved as draft.",
      });
      
      setTimeout(() => {
        navigate('/admin/blog');
      }, 1000);

    } catch (error: any) {
      console.error(error);
      toast({
        title: "Save failed",
        description: error.message || String(error),
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const canSave = title.trim().length > 0 && content.trim().length > 0;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading post...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
          <CardDescription>
            {isEditMode 
              ? 'Update your blog post details below.'
              : 'Fill in the details below to create a new blog post.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter blog post title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="auto-generated-slug"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                type="url"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {coverImageUrl && (
                <div className="mt-2">
                  <img 
                    src={coverImageUrl} 
                    alt="Cover preview" 
                    className="w-full h-48 object-cover rounded-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EInvalid URL%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description of your blog post..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Write your blog post content here..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(val) => setStatus(val as "draft" | "published")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="real estate, market trends, tips"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
              <Checkbox 
                id="featured" 
                checked={isFeatured}
                onCheckedChange={(checked) => setIsFeatured(checked as boolean)}
              />
              <div className="flex-1">
                <Label 
                  htmlFor="featured" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Mark as Featured Post
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Featured posts will be displayed prominently on the blog page
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                onClick={() => handleSave(false)}
                variant="outline"
                disabled={!canSave || isSaving}
                className="flex-1"
              >
                {isSaving && status === "draft" ? "Saving..." : "Save Draft"}
              </Button>
              
              <Button 
                onClick={() => handleSave(true)}
                disabled={!canSave || isSaving}
                className="flex-1"
              >
                {isSaving && status === "published" ? "Publishing..." : isEditMode ? "Update & Publish" : "Publish"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlogForm;
