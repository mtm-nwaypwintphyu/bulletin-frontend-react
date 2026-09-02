import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUserStore } from "../../stores/useUserStore";
import Button from "../../components/ui/Button";

export default function ConfirmUser() {
  const navigate = useNavigate();
  const { createUser, formDraft, clearFormDraft } = useUserStore();
  const [loading, setLoading] = useState(false);

  if (!formDraft) {
    navigate("/create-user");
    return null;
  }

  const { name, email, phone, dob, type, address, profile, previewUrl } =
    formDraft;

  const handleFinalSubmit = async () => {
    setLoading(true);
    const result = await createUser(
      { name, email, password: formDraft.password, phone, dob, type, address },
      profile,
    );
    setLoading(false);

    if (result?.success) {
      clearFormDraft();
      toast.success("User created successfully!");
      navigate("/users");
    } else {
      toast.error(result?.message || "Failed to create user.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto rounded-lg border border-brand-border bg-brand-card shadow-xl overflow-hidden text-brand-text">
      <div className="bg-brand-code-bg px-6 py-4 border-b border-brand-border flex justify-between items-center">
        <h1 className="text-lg font-bold text-brand-heading">
          Confirm User Details
        </h1>
      </div>

      <div className="p-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-brand-accent-bg/40 p-6 rounded-lg border border-brand-border text-sm">
          {previewUrl ? (
            <div className="sm:col-span-2 flex items-center gap-4 pb-4 border-b border-brand-border">
              <div className="w-20 h-20 rounded-full border-2 border-brand-primary/50 overflow-hidden flex-shrink-0 bg-brand-card shadow-inner">
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-semibold text-brand-text/60 uppercase tracking-wider">
                  Profile Image
                </span>
                <p className="text-xs font-medium text-brand-text mt-0.5">
                  {profile?.name || "Uploaded Image"}
                </p>
              </div>
            </div>
          ) : (
            <div className="sm:col-span-2 flex items-center gap-4 pb-4 border-b border-brand-border">
              <div className="w-16 h-16 rounded-full border border-brand-border flex items-center justify-center bg-brand-card text-xs text-brand-text/50">
                No Image
              </div>
              <div>
                <span className="text-xs font-semibold text-brand-text/60 uppercase tracking-wider">
                  Profile Image
                </span>
                <p className="text-xs text-brand-text/50 mt-0.5">
                  Not provided
                </p>
              </div>
            </div>
          )}

          <div>
            <span className="text-xs font-semibold text-brand-text/60 uppercase tracking-wider">
              Name
            </span>
            <p className="font-medium text-brand-heading mt-0.5">{name}</p>
          </div>

          <div>
            <span className="text-xs font-semibold text-brand-text/60 uppercase tracking-wider">
              Email
            </span>
            <p className="font-medium text-brand-heading mt-0.5">{email}</p>
          </div>

          <div>
            <span className="text-xs font-semibold text-brand-text/60 uppercase tracking-wider">
              User Type
            </span>
            <p className="font-medium mt-0.5">
              <span
                className={`px-2 py-0.5 text-xs rounded-md font-semibold ${type === "ADMIN" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"}`}
              >
                {type}
              </span>
            </p>
          </div>

          <div>
            <span className="text-xs font-semibold text-brand-text/60 uppercase tracking-wider">
              Phone
            </span>
            <p className="font-medium text-brand-heading mt-0.5">
              {phone || "N/A"}
            </p>
          </div>

          <div>
            <span className="text-xs font-semibold text-brand-text/60 uppercase tracking-wider">
              Date of Birth
            </span>
            <p className="font-medium text-brand-heading mt-0.5">
              {dob || "N/A"}
            </p>
          </div>

          <div className="sm:col-span-2">
            <span className="text-xs font-semibold text-brand-text/60 uppercase tracking-wider">
              Address
            </span>
            <p className="font-medium text-brand-heading mt-0.5">
              {address || "N/A"}
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
            Back to Edit
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={handleFinalSubmit}
            disabled={loading}
            className="px-5 py-2 text-sm"
          >
            {loading ? "Creating User..." : "Confirm & Create"}
          </Button>
        </div>
      </div>
    </div>
  );
}
