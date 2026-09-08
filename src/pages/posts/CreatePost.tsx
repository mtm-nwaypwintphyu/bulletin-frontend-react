import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { getPostDraft, savePostDraft } from "../../utils/postDraft";

export default function CreatePost() {
  const navigate = useNavigate();
  const existing = getPostDraft();

  const [title, setTitle] = useState(existing?.title || "");
  const [description, setDescription] = useState(existing?.description || "");

  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

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
    savePostDraft({
      title,
      description,
    });
    navigate("/posts/create/confirm");
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto rounded-lg border border-brand-border bg-brand-card shadow-xl overflow-hidden text-brand-text">
      <div className="bg-brand-code-bg px-6 py-4 border-b border-brand-border">
        <h1 className="text-lg font-bold text-brand-heading">Create Post</h1>
      </div>

      <form className="p-8 flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row justify-center sm:items-center gap-2">
          <span className="font-medium text-xs mr-5 w-28">
            Post Title: <span className="text-brand-red">*</span>
          </span>
          <div className="w-full sm:w-1/2">
            <InputField
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              placeholder="Enter post title"
            />
            {errors.title && <ErrorMessage message={errors.title} />}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-start gap-2">
          <span className="font-medium text-xs mr-5 w-28 pt-2">
            Description: <span className="text-brand-red">*</span>
          </span>
          <div className="w-full sm:w-1/2">
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors((prev) => ({ ...prev, description: undefined }));
              }}
              rows={4}
              placeholder="Enter post description.."
              className="w-full rounded-lg border bg-brand-card px-4 py-2.5 text-sm text-brand-heading transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 border-brand-border focus:border-brand-accent focus:ring-brand-accent/20 resize-y"
            />
            {errors.description && (
              <ErrorMessage message={errors.description} />
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-brand-border justify-end">
          <Button variant="primary" type="submit" className="px-4 py-2 text-sm">
            Review & Confirm
          </Button>
          <Button variant="outline" type="button" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}
