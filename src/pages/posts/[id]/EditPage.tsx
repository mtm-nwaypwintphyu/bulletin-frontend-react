import { useEffect, useState, type SubmitEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../../../hooks/usePosts";
import InputField from "../../../components/ui/InputField";
import Button from "../../../components/ui/Button";
import ErrorMessage from "../../../components/ui/ErrorMessage";

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const { post, getPostById } = usePosts();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    getPostById(Number(id));
  }, [id, getPostById]);

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setDescription(post.description || "");
    }
  }, [post]);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const newErrors: {
      title?: string;
      description?: string;
    } = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.trim().length > 255) {
      newErrors.description = "Description must be under 255 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    const draftData = {
      title: title,
      description: description,
    };
    localStorage.setItem("post-draft", JSON.stringify(draftData));

    navigate(`/posts/${Number(id)}/edit/confirm`);
  };

  const handleClear = () => {
    setTitle(post?.title || "");
    setDescription(post?.description || "");
    setErrors({});
  };

  if (!post) {
    return <div className="p-8 text-center text-brand-text">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto rounded-lg border border-brand-border bg-brand-card shadow-xl overflow-hidden text-brand-text">
      <div className="bg-brand-code-bg px-6 py-4 border-b border-brand-border">
        <h1 className="text-lg font-bold text-brand-heading">Edit Post</h1>
      </div>

      <form className="p-8 flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="justify-center flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="font-medium text-xs mr-5 w-28">Name:</span>
          <div className="w-full sm:w-1/2">
            <InputField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="User name"
            />
            {errors.title && <ErrorMessage message={errors.title} />}
          </div>
        </div>

        <div className="justify-center flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="font-medium text-xs mr-5 w-28">Description:</span>
          <div className="w-full sm:w-1/2">
            <InputField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            {errors.description && (
              <ErrorMessage message={errors.description} />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-brand-border">
          <div className="flex gap-3">
            <Button
              variant="primary"
              type="submit"
              className="px-4 py-2 text-sm"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Edit"}
            </Button>
            <Button variant="outline" type="button" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
