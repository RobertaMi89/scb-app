import React from "react";

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    ref?: React.Ref<HTMLButtonElement>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ onClick, children, className, type = "button", disabled }, ref) =>
    <button
        ref={ref}
        onClick={onClick}
        className={`${disabled ? className?.concat(' disabled:opacity-75') : className}`}
        type={type}
        disabled={disabled}
        aria-disabled={disabled}>
        {children}
    </button>
);

export default Button;
