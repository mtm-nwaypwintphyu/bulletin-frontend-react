import { useEffect, useState, useRef } from "react";
import { usePosts } from "../../hooks/usePosts";
import PostCard from "../../components/ui/PostCard";
import { toast } from "sonner";
import { PAGINATION } from "../../utils/constants";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function PostList() {
  const { posts, loading, fetchPosts, deletePost, togglePost } = usePosts();

  const [page, setPage] = useState(1);
  const limit = PAGINATION.DEFAULT_LIMIT;
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const [searchFilters, setSearchFilters] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const search = [searchFilters.title, searchFilters.description]
      .filter(Boolean)
      .join(" ");
    fetchPosts({ page, limit, search: search || undefined });
  }, [fetchPosts, page, limit, searchFilters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFilters({
      title: titleRef.current?.value || "",
      description: descriptionRef.current?.value || "",
    });
    setPage(1);
  };

  const handleDeletePost = async (postId: number) => {
    const result = await deletePost(postId);
    if (result.success) {
      toast.success(result.message || "Post deleted successfully.");
      const search = [searchFilters.title, searchFilters.description]
        .filter(Boolean)
        .join(" ");
      fetchPosts({ page, limit, search: search || undefined });
    } else {
      toast.error(result.message || "Failed to delete post.");
    }
  };

  const handleReactPost = async (postId: number) => {
    if (!togglePost) return;
    const result = await togglePost(postId);
    if (result.success) {
      const search = [searchFilters.title, searchFilters.description]
        .filter(Boolean)
        .join(" ");
      fetchPosts({ page, limit, search: search || undefined });
    } else {
      toast.error(result.message || "Failed to react to post.");
    }
  };

  const handleEditPost = (postId: number) => {
    navigate(`/posts/${postId}/edit`);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="text-center py-10 text-brand-text">Loading feed...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">
      <div className="bg-brand-card border border-brand-border rounded-lg p-5 shadow-sm">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-4 items-end"
        >
          <div className="w-full sm:w-1/3">
            <InputField
              label="Title"
              ref={titleRef}
              placeholder="Filter by title..."
            />
          </div>
          <div className="w-full sm:w-1/3">
            <InputField
              label="Description"
              ref={descriptionRef}
              placeholder="Filter by description..."
            />
          </div>
          <div className="w-full sm:w-auto flex items-center">
            <Button
              type="submit"
              className="px-5 h-10 text-sm w-full sm:w-auto"
            >
              Search
            </Button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-brand-heading">Posts</h1>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-brand-text/70 py-12 bg-brand-card border border-brand-border rounded-lg">
          No posts found.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
              onReact={handleReactPost}
            />
          ))}
        </div>
      )}
    </div>
  );
}
