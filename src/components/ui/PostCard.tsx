import type { Post } from "../../types/api";
import { Heart } from "lucide-react";
import Button from "./Button";
import { useState } from "react";
import ConfirmationModal from "../common/ConfirmationModal";

interface PostCardProps {
  post: Post;
  onReact?: (postId: number) => void;
  onDelete?: (postId: number) => void;
  onEdit?: (postId: number) => void;
}

export default function PostCard({
  post,
  onReact,
  onDelete,
  onEdit,
}: PostCardProps) {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  return (
    <div className="rounded-lg border border-brand-border bg-brand-card p-5 shadow-sm transition-shadow hover:shadow-md flex flex-col gap-3 text-brand-text relative">
      <div className="flex items-center justify-between text-xs text-brand-text/70">
        <span className="font-semibold text-brand-heading">
          @{post.createUsername || "anonymous"}
        </span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <div>
        <h2 className="text-base font-bold text-brand-heading">{post.title}</h2>
        <p className="text-sm text-brand-text/90 mt-1 whitespace-pre-line leading-relaxed">
          {post.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-brand-border mt-1">
        <button
          type="button"
          onClick={() => onReact?.(post.id)}
          className="flex items-center gap-1.5 text-xs font-medium text-brand-text hover:text-brand-accent transition-colors bg-brand-accent-bg px-3 py-1.5 rounded-md border border-brand-border group"
        >
          <Heart
            size={16}
            className="text-brand-red transition-transform group-hover:scale-110 fill-current"
          />
          <span>{post.reactionCount || 0} reactions</span>
        </button>

        <div className="flex items-center gap-2">
          <Button
            className="px-3 py-1 text-xs"
            variant="outline"
            onClick={() => onEdit?.(post.id)}
          >
            Edit
          </Button>
          <Button
            onClick={() => setShowConfirm(true)}
            variant="danger"
            className="px-3 py-1 text-xs"
          >
            Delete
          </Button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmationModal
          title="Delete Post"
          isOpen={showConfirm}
          message="Are you sure you want to delete this post? This action cannot be undone."
          confirmText="Delete"
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            setShowConfirm(false);
            onDelete?.(post.id);
          }}
        />
      )}
    </div>
  );
}
