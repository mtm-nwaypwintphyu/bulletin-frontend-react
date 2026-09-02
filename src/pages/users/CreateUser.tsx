import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

import { saveUserDraft, getUserDraft } from "../../utils/userDraft";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import ErrorMessage from "../../components/ui/ErrorMessage";

export default function CreateUser() {
  const navigate = useNavigate();
  const existing = getUserDraft();

  const [name, setName] = useState(existing?.name || "");
  const [email, setEmail] = useState(existing?.email || "");
  const [password, setPassword] = useState(existing?.password || "");
  const [phone, setPhone] = useState(existing?.phone || "");
  const [dob, setDob] = useState(existing?.dob || "");
  const [type, setType] = useState(existing?.type || "USER");
  const [address, setAddress] = useState(existing?.address || "");
  const [profile, setProfile] = useState<File | null>(
    existing?.profile || null,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    existing?.previewUrl || null,
  );

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
  }>({});

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfile(file);
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleProceedToConfirm = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      phone?: string;
    } = {};

    if (!name.trim()) newErrors.name = "Name is required";
    else if (name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    const phoneRegex = /^[0-9]+$/;
    if (phone.trim() && !phoneRegex.test(phone.trim())) {
      newErrors.phone = "Phone number must contain only numbers";
    } else if (phone.trim() && phone.trim().length < 9) {
      newErrors.phone = "Phone number must be at least 9 digits";
    } else if (phone.trim() && phone.trim().length > 9) {
      newErrors.phone = "Phone number must be under 9 digits";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    saveUserDraft({
      name,
      email,
      password,
      phone,
      dob,
      type,
      address,
      profile,
      previewUrl,
    });
    navigate("/create-confirm");
  };

  const handleClear = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setDob("");
    setType("USER");
    setAddress("");
    setProfile(null);
    setPreviewUrl(null);
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto rounded-lg border border-brand-border bg-brand-card shadow-xl overflow-hidden text-brand-text">
      <div className="bg-brand-code-bg px-6 py-4 border-b border-brand-border">
        <h1 className="text-lg font-bold text-brand-heading">Create User</h1>
      </div>

      <form
        className="p-8 flex flex-col gap-5"
        onSubmit={handleProceedToConfirm}
      >
        <div className="flex flex-col sm:flex-row justify-center sm:items-center gap-2">
          <span className="font-medium text-xs mr-5 w-28">
            Name: <span className="text-brand-red">*</span>
          </span>
          <div className="w-full sm:w-1/2">
            <InputField
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="User name"
            />
            {errors.name && <ErrorMessage message={errors.name} />}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center sm:items-center gap-2">
          <span className="font-medium text-xs mr-5 w-28">
            Email: <span className="text-brand-red">*</span>
          </span>
          <div className="w-full sm:w-1/2">
            <InputField
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="User email"
            />
            {errors.email && <ErrorMessage message={errors.email} />}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center sm:items-center gap-2">
          <span className="font-medium text-xs mr-5 w-28">
            Password: <span className="text-brand-red">*</span>
          </span>
          <div className="w-full sm:w-1/2">
            <InputField
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="User password"
            />
            {errors.password && <ErrorMessage message={errors.password} />}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center sm:items-center gap-2">
          <span className="font-medium text-xs mr-5 w-28">Type:</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full sm:w-1/2 px-3 py-2 text-sm bg-brand-card border border-brand-border rounded-md text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-primary"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row justify-center sm:items-center gap-2">
          <span className="font-medium text-xs mr-5 w-28">Phone:</span>
          <div className="w-full sm:w-1/2">
            <InputField
              type="number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setErrors((prev) => ({ ...prev, phone: undefined }));
              }}
              placeholder="User phone"
            />
            {errors.phone && <ErrorMessage message={errors.phone} />}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center sm:items-center gap-2">
          <span className="font-medium text-xs mr-5 w-28">Date of Birth:</span>
          <div className="w-full sm:w-1/2">
            <InputField
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center sm:items-center gap-2">
          <span className="font-medium text-xs mr-5 w-28">Address:</span>
          <div className="w-full sm:w-1/2">
            <InputField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="User address"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-start gap-2">
          <span className="font-medium text-xs mr-5 w-28 pt-2">
            Profile Image:
          </span>
          <div className="w-full sm:w-1/2 flex flex-col gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-xs text-brand-text/80 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-brand-accent-bg file:text-brand-text hover:file:bg-brand-border cursor-pointer"
            />
            {previewUrl && (
              <div className="flex items-center gap-4 mt-2">
                <div className="w-16 h-16 rounded-full bg-brand-accent-bg border border-brand-border flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setPreviewUrl(null);
                    setProfile(null);
                  }}
                  className="px-3 py-1.5 text-xs text-brand-red hover:text-red-600 border-red-500/30 hover:border-red-500"
                >
                  Cancel Image
                </Button>
              </div>
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
