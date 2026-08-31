interface FormLayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export default function FormLayout({
  children,
  title = "Form Title",
  description = "Form Description",
}: FormLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-bg px-4">
      <div className="w-full max-w-xl my-10 space-y-6 rounded-xl border border-brand-border bg-brand-card p-8 shadow-xl">
        <h1 className="text-center text-2xl font-bold tracking-tight text-brand-heading">
          {title}
        </h1>
        <p className="text-xs ita text-center font-light">{description}</p>
        {children}
      </div>
    </div>
  );
}
