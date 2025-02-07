import React from "react";

interface ButtonProps {
  text?: string;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const AuthButton: React.FC<ButtonProps> = ({
  text = "Submit",
  isLoading = false,
  disabled = false,
  className = "",
  onClick = () => {},
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`w-full h-11 flex items-center justify-center mx-auto tracking-wide rounded-lg
        ${
          isLoading
            ? "bg-primary cursor-not-allowed"
            : "bg-primary hover:bg-primary-dark"
        } 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
        ${className}`}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
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
              d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        text
      )}
    </button>
  );
};

export default AuthButton;
