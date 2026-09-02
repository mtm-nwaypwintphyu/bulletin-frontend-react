const STORAGE_KEY = "user_draft";

interface UserDraft {
  name: string;
  email: string;
  password: string;
  phone: string;
  dob: string;
  type: string;
  address: string;
  profileName: string | null;
  profileDataUrl: string | null;
}

let pendingFile: File | null = null;

export function saveUserDraft(draft: {
  name: string;
  email: string;
  password: string;
  phone: string;
  dob: string;
  type: string;
  address: string;
  profile: File | null;
  previewUrl: string | null;
}) {
  const serializable: UserDraft = {
    name: draft.name,
    email: draft.email,
    password: draft.password,
    phone: draft.phone,
    dob: draft.dob,
    type: draft.type,
    address: draft.address,
    profileName: draft.profile?.name ?? null,
    profileDataUrl: draft.previewUrl,
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
  pendingFile = draft.profile;
}

export function getUserDraft() {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const data: UserDraft = JSON.parse(raw);
    return {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      dob: data.dob,
      type: data.type,
      address: data.address,
      profile: pendingFile,
      previewUrl: data.profileDataUrl,
    };
  } catch {
    return null;
  }
}

export function clearUserDraft() {
  sessionStorage.removeItem(STORAGE_KEY);
  pendingFile = null;
}
