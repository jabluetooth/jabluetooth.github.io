import * as React from "react";
import { cn } from "@/lib/utils";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, error, required, type, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const hasValue = value !== undefined && value !== "";
    const isActive = isFocused || hasValue;

    return (
      <div className="relative">
        <input
          type={type}
          ref={ref}
          value={value}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={cn(
            "peer w-full h-14 px-4 pt-5 pb-2 text-base bg-gray-200 rounded-xl border-2 border-transparent outline-none transition-all duration-200",
            "hover:bg-gray-300/80",
            "focus:border-red-500 focus:bg-gray-50",
            error && "border-red-500 bg-red-50",
            className
          )}
          placeholder=" "
          {...props}
        />
        <label
          className={cn(
            "absolute left-4 transition-all duration-200 pointer-events-none text-gray-500",
            isActive
              ? "top-2 text-xs font-medium"
              : "top-1/2 -translate-y-1/2 text-base",
            isFocused && "text-red-500",
            error && "text-red-500"
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const FloatingTextarea = React.forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ className, label, error, required, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const hasValue = value !== undefined && value !== "";
    const isActive = isFocused || hasValue;

    return (
      <div className="relative">
        <textarea
          ref={ref}
          value={value}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={cn(
            "peer w-full min-h-[120px] px-4 pt-7 pb-2 text-base bg-gray-200 rounded-xl border-2 border-transparent outline-none transition-all duration-200 resize-none",
            "hover:bg-gray-300/80",
            "focus:border-red-500 focus:bg-gray-50",
            error && "border-red-500 bg-red-50",
            className
          )}
          placeholder=" "
          {...props}
        />
        <label
          className={cn(
            "absolute left-4 transition-all duration-200 pointer-events-none text-gray-500",
            isActive
              ? "top-2 text-xs font-medium"
              : "top-4 text-base",
            isFocused && "text-red-500",
            error && "text-red-500"
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FloatingTextarea.displayName = "FloatingTextarea";

interface FloatingSelectProps {
  label: string;
  error?: string;
  required?: boolean;
  value?: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}

const FloatingSelect = React.forwardRef<HTMLSelectElement, FloatingSelectProps>(
  ({ className, label, error, required, value, onValueChange, options }, ref) => {
    const hasValue = value !== undefined && value !== "";

    return (
      <div className="relative">
        <select
          ref={ref}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className={cn(
            "peer w-full h-14 px-4 pt-5 pb-2 text-base bg-gray-200 rounded-xl border-2 border-transparent outline-none transition-all duration-200 appearance-none cursor-pointer",
            "hover:bg-gray-300/80",
            "focus:border-red-500 focus:bg-gray-50",
            !hasValue && "text-transparent",
            error && "border-red-500 bg-red-50",
            className
          )}
        >
          <option value="" disabled></option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-gray-900">
              {option.label}
            </option>
          ))}
        </select>
        <label
          className={cn(
            "absolute left-4 transition-all duration-200 pointer-events-none text-gray-500",
            hasValue
              ? "top-2 text-xs font-medium"
              : "top-1/2 -translate-y-1/2 text-base",
            error && "text-red-500"
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FloatingSelect.displayName = "FloatingSelect";

export { FloatingInput, FloatingTextarea, FloatingSelect };
