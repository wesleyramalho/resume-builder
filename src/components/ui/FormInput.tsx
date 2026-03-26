"use client";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id: string;
}

export function FormInput({ label, error, id, className = "", ...props }: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-xs font-sans uppercase tracking-widest text-text-subtle">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring transition-colors ${error ? "border-destructive" : ""} ${className}`}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  id: string;
  action?: React.ReactNode;
}

export function FormTextarea({ label, error, id, action, className = "", ...props }: FormTextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {(label || action) && (
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={id} className="text-xs font-sans uppercase tracking-widest text-text-subtle">
              {label}
            </label>
          )}
          {action}
        </div>
      )}
      <textarea
        id={id}
        className={`w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring transition-colors resize-none ${error ? "border-destructive" : ""} ${className}`}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
