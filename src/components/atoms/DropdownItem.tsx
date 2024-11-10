interface DropdownItemProps {
    label: string;
    onClick: () => void;
}

const DropdownItem = ({ label, onClick }: DropdownItemProps) => (
    <li>
        <button
            onClick={onClick}
            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
            {label}
        </button>
    </li>
);

export default DropdownItem;
