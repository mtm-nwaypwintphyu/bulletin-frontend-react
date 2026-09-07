const STORAGE_KEY = "post_draft";

interface PostDraft {
  title: string;
  description: string;
}

export function savePostDraft(draft: { title: string; description: string }) {
  const serializable: PostDraft = {
    title: draft.title,
    description: draft.description,
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
}

export function getPostDraft() {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const data: PostDraft = JSON.parse(raw);
    return {
      title: data.title,
      description: data.description,
    };
  } catch {
    return null;
  }
}

export function clearPostDraft() {
  sessionStorage.removeItem(STORAGE_KEY);
}
