import { useEffect, useState, type SubmitEvent } from "react";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { User as UserIcon } from "lucide-react";

import { useUserStore } from "../../stores/useUserStore";
import { useAuthStore } from "../../stores/useAuthStore";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import ErrorMessage from "../../components/ui/ErrorMessage";

export default function EditProfile() {
  const { currentUser } = useAuthStore();
  const { user, getUserById, updateUser } = useUserStore();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [profile, setProfile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [removeProfile, setRemoveProfile] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; name?: string }>({});

  useEffect(() => {
    if (currentUser?.id) {
      getUserById(currentUser.id);
    }
  }, [getUserById, currentUser?.id]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setDob(user.dob ? user.dob.split("T")[0] : "");
      setType(user.type || "");
      setAddress(user.address || "");
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfile(file);
    setRemoveProfile(false);
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleRemovePhoto = () => {
    setProfile(null);
    setPreviewUrl(null);
    setRemoveProfile(true);
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const newErrors: { email?: string; name?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!currentUser?.id) return;

    const userData: Record<string, string> = { name, email, phone, dob, type, address };
    if (removeProfile) {
      userData.profile = "";
    }

    const result = await updateUser(
      currentUser.id,
      userData,
      removeProfile ? null : profile,
    );

    if (result?.success) {
      toast.success("Profile updated successfully!");
      navigate("/posts");
    } else {
      toast.error(result?.message || "Failed to update profile.");
    }
  };

  const handleClear = () => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setDob(user.dob ? user.dob.split("T")[0] : "");
      setType(user.type || "");
      setAddress(user.address || "");
      setProfile(null);
      setPreviewUrl(null);
      setRemoveProfile(false);
      setErrors({});
    }
  };

  return (
    <div className="max-w-4xl mx-auto rounded-lg border border-brand-border bg-brand-card shadow-xl overflow-hidden text-brand-text">
      <div className="bg-brand-code-bg px-6 py-4 border-b border-brand-border">
        <h1 className="text-lg font-bold text-brand-heading">Edit Profile</h1>
      </div>

      <form className="p-8 flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="justify-center flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="font-medium text-xs mr-5 w-28">Name:</span>
          <div className="w-full sm:w-1/2">
            <InputField
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="User name"
            />
            {errors.name && <ErrorMessage message={errors.name} />}
          </div>
        </div>

        <div className="justify-center flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="font-medium text-xs mr-5 w-28">Email:</span>
          <div className="w-full sm:w-1/2">
            <InputField
              type="email"
              disabled
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="User email"
            />
            {errors.email && <ErrorMessage message={errors.email} />}
          </div>
        </div>

        {currentUser?.type === "ADMIN" && (
          <div className="flex justify-center flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-medium text-xs mr-5 w-28">Type:</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full sm:w-1/2 px-3 py-2 text-sm bg-brand-card border border-brand-border rounded-md text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-primary"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        <div className="flex justify-center flex-col sm:flex-row sm:items-center gap-2">
          <span className="font-medium text-xs mr-5 w-28">Phone:</span>
          <div className="w-full sm:w-1/2">
            <InputField
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="User phone"
            />
          </div>
        </div>

        <div className="flex justify-center flex-col sm:flex-row sm:items-center gap-2">
          <span className="font-medium text-xs mr-5 w-28">Date of Birth:</span>
          <div className="w-full sm:w-1/2">
            <InputField
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="User date of birth"
            />
          </div>
        </div>

        <div className="flex justify-center flex-col sm:flex-row sm:items-center gap-2">
          <span className="font-medium text-xs mr-5 w-28">Address:</span>
          <div className="w-full sm:w-1/2">
            <InputField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="User address"
            />
          </div>
        </div>

        <div className="flex justify-center flex-col sm:flex-row items-start gap-2">
          <span className="font-medium text-xs mr-5 w-28 pt-2">
            Old Profile:
          </span>
          <div className="w-full sm:w-1/2 flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-brand-accent-bg border border-brand-border flex items-center justify-center overflow-hidden">
              {removeProfile ? (
                <UserIcon className="size-8 text-brand-text/40" />
              ) : user?.profile ? (
                <img
                  src={user.profile}
                  alt={user.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon className="size-8 text-brand-text/40" />
              )}
            </div>
            {user?.profile && !removeProfile && !previewUrl && (
              <Button
                type="button"
                variant="outline"
                onClick={handleRemovePhoto}
                className="px-3 py-1.5 text-xs text-brand-red hover:text-red-600 border-red-500/30 hover:border-red-500"
              >
                Remove Photo
              </Button>
            )}
            {removeProfile && (
              <span className="text-xs text-brand-red">Photo will be removed</span>
            )}
          </div>
        </div>

        <div className="flex justify-center flex-col sm:flex-row items-start gap-2">
          <span className="font-medium text-xs mr-5 w-28 pt-2">
            New Profile:
          </span>
          <div className="w-full sm:w-1/2 flex flex-col gap-3">
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full text-xs text-brand-text/80 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-brand-accent-bg file:text-brand-text hover:file:bg-brand-border cursor-pointer"
            />
            {previewUrl && (
              <div className="w-20 h-20 rounded-full bg-brand-accent-bg border border-brand-border flex items-center justify-center overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-3 pt-4 border-t border-brand-border">
          <Button variant="primary" type="submit" className="px-4 py-2 text-sm">
            Edit
          </Button>
          <Button variant="outline" type="button" onClick={handleClear}>
            Clear
          </Button>

          <div className="flex justify-end w-full">
            <Link to="/profile/change-password" className="text-s text-brand-accent underline">
              Change Password
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
