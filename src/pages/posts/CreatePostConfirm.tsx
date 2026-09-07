import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { clearPostDraft, getPostDraft } from "../../utils/postDraft";
import { usePosts } from "../../hooks/usePosts";
import Button from "../../components/ui/Button";

export default function ConfirmPost() {
  const { createPost, loading } = usePosts();

  const navigate = useNavigate();
  const formDraft = getPostDraft();

  if (!formDraft) return null;

  const { title, description } = formDraft;

  const handleFinalSubmit = async () => {
    const result = await createPost({ title, description });
    if (result.success) {
      toast.success(result.message || "Post created successfully!");
      navigate("/posts", { replace: true });
      clearPostDraft();
    } else {
      toast.error(result.message || "Post creation failed!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto rounded-lg border border-brand-border bg-brand-card shadow-xl overflow-hidden text-brand-text">
      <div className="bg-brand-code-bg px-6 py-4 border-b border-brand-border flex justify-between items-center">
        <h1 className="text-lg font-bold text-brand-heading">
          Confirm Post Details
        </h1>
      </div>

      <div className="p-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 bg-brand-accent-bg/40 p-6 rounded-lg border border-brand-border text-sm">
          <div>
            <span className="text-xs font-semibold text-brand-text/60 uppercase tracking-wider">
              Post Title
            </span>
            <p className="font-medium text-brand-heading mt-0.5 text-base">
              {title}
            </p>
          </div>

          <div>
            <span className="text-xs font-semibold text-brand-text/60 uppercase tracking-wider">
              Post Description
            </span>
            <p className="font-medium text-brand-heading mt-0.5 whitespace-pre-wrap leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-brand-border justify-end">
          <Button
            variant="outline"
            type="button"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Back
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={handleFinalSubmit}
            disabled={loading}
            className="px-5 py-2 text-sm"
          >
            {loading ? "Creating Post..." : "Confirm & Create"}
          </Button>
        </div>
      </div>
    </div>
  );
}
