import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FieldWrapperProps {
  label: string;
  error?: string;
  className?: string;
}

type InputProps = FieldWrapperProps & InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = FieldWrapperProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

const fieldBase =
  "peer w-full bg-transparent border-b border-border py-3 text-fg font-body placeholder-transparent focus:outline-none focus:border-accent transition-colors duration-micro";

const labelBase =
  "absolute left-0 top-3 text-fg-muted font-body transition-all duration-micro pointer-events-none peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent-text peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs";

export const Field = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, id, ...rest }, ref) => {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={cn("relative", className)}>
      <input ref={ref} id={fieldId} placeholder={label} className={fieldBase} {...rest} />
      <label htmlFor={fieldId} className={labelBase}>
        {label}
      </label>
      {error && (
        <p role="alert" className="tag-mono mt-2 text-destructive">
          {error}
        </p>
      )}
    </div>
  );
});
Field.displayName = "Field";

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...rest }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className={cn("relative", className)}>
        <textarea ref={ref} id={fieldId} placeholder={label} rows={4} className={cn(fieldBase, "resize-none")} {...rest} />
        <label htmlFor={fieldId} className={labelBase}>
          {label}
        </label>
        {error && (
          <p role="alert" className="tag-mono mt-2 text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  },
);
TextAreaField.displayName = "TextAreaField";
