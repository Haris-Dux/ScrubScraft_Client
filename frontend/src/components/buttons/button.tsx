import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      children,
      loading = false,
      loadingText,
      onClick,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!loading && onClick) {
        onClick(event);
      }
    };

    return (
      <button
        className={`
          inline-flex items-center justify-center
          px-6 py-2
          text-sm font-medium
          text-white bg-blue-600
          rounded-md
          transition-colors duration-200
          hover:bg-blue-700
          disabled:opacity-50 disabled:cursor-not-allowed
          ${loading ? "cursor-wait" : ""}
          ${className}
        `}
        ref={ref}
        onClick={handleClick}
        disabled={disabled || loading}
        type={type}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {loadingText || "Loading..."}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

{
  /* <Button
disabled
 loadingText="Submiting..."
loading={false}
onClick={handleClick}
className=""
>
Default Button
</Button> */
}
