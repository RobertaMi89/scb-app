interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}

const Button = ({ onClick, children, className }: ButtonProps) => (
    <button onClick={onClick} className={className}>
        {children}
    </button>
);

export default Button;
