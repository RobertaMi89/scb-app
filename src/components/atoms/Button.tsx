interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

const Button = ({ onClick, children, className, type = "button", disabled }: ButtonProps) => (
    <button
        onClick={onClick}
        className={className}
        type={type}
        disabled={disabled}
        aria-disabled={disabled}>
        {children}
    </button>
);

export default Button;
